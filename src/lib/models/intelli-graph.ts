import { ChatOpenAI } from '@langchain/openai'
import {
  HumanMessage,
  BaseMessage,
  AIMessage,
  AIMessageChunk,
  ToolMessage
} from '@langchain/core/messages'
import { END, START, StateGraph, StateGraphArgs } from '@langchain/langgraph'
import { FunctionMessage } from '@langchain/core/messages'
import { AgentAction } from '@langchain/core/agents'
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts'
import { ToolExecutor } from '@langchain/langgraph/prebuilt'
import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling'
import { DynamicStructuredTool, StructuredTool } from '@langchain/core/tools'
import * as z from 'zod'
import { topicfier } from './topicfier'
import { RunnableConfig } from '@langchain/core/runnables'
import { MemorySaver } from '@langchain/langgraph'

export async function intelliGraph() {
  // First node
  // agent 0 : classify a question into a category.
  // if it is a medical question, then call a tool to get the sub-topic
  // if it is a general question, then go to END

  // agent 1 : classify a medical question into a category.
  // call a tool to get the answer - the tool is a prompt that must return a json object
  // if json object contains a topic, then END
  // if json object detects a ambigous and a clarifying question is asked, then continue

  // set up the tools

  // Function to label the topic

  // Define the schema for the object
  const topic_schema = z.object({
    topic: z.string(),
    sub_topic: z.string(),
    clarifying_question: z.string(),
    options: z.array(z.unknown()), // Adjust type as necessary
    language: z.string()
  })

  function isSerializableToObject(str: string): boolean {
    try {
      const parsed = JSON.parse(str)
      topic_schema.parse(parsed) // This will throw an error if the object doesn't match the schema
      return typeof parsed === 'object' && parsed !== null
    } catch (e) {
      return false
    }
  }

  const get_query_topic = new DynamicStructuredTool({
    name: 'Query_Topic',
    description: `This task involves identify the right topic for the user query and return the json: {"topic:  "medicine", "sub_topic": "health_technology_assessment"}
                  Analyze the thread and if the last human message is an option of a previous ambiguous question, the return the number of the option selected.
                  `,
    schema: z.object({
      question: z.string().describe(
        `question is a string that represents the user query. It can be anything from a single word to a full sentence and it should contain the idea of what is questioned. 
          OR it can be a option (numerical or not) that represents the option selected by the user in a previous ambiguous question.`
      )
    }),
    func: async ({ question }) => {
      const result = await topicfier.invoke({ inputText: question })
      return JSON.stringify(result) || '' // Ensure a string value is always returned, even if it is undefined
    }
  })

  const tools = [get_query_topic] as Array<StructuredTool>

  // set up the tool executor
  // @ts-ignore
  const toolExecutor = new ToolExecutor({ tools })

  // set up the model
  // We will set streaming: true so that we can stream tokens
  // See the streaming section for more information on this.
  const model = new ChatOpenAI({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0,
    streaming: false
  })

  // we should make sure the model knows that it has these tools available to call.
  // We can do this by converting the LangChain tools into the format for OpenAI
  // function calling, and then bind them to the model class.

  // const toolsAsOpenAIFunctions = tools.map((tool) =>
  //   convertToOpenAIFunction(tool)
  // )
  const newModel = model.bindTools(tools, {
    tool_choice: { type: 'function', function: { name: 'Query_Topic' } }
  })
  // STATE GRAPH
  // This time, we'll use the more general StateGraph.
  // This graph is parameterized by a state object that it passes around to each node.
  // Remember that each node then returns operations to update that state.
  // These operations can either SET specific attributes on the state (e.g. overwrite the existing values)
  // or ADD to the existing attribute.
  // Whether to set or add is denoted by annotating the state object you construct the graph with.

  // Define the agent state, here we concatenate all messages

  interface State {
    messages: Array<BaseMessage>
  }

  const agentState: StateGraphArgs<State>['channels'] = {
    messages: {
      value: (x?: BaseMessage[], y?: BaseMessage[]) =>
        (x ?? []).concat(y ?? []),
      default: () => []
    }
  }

  // Define the function which tells what kind of BaseMessage

  function baseType(message: HumanMessage | AIMessage | FunctionMessage) {
    if (message.lc_id.includes('HumanMessage')) return 'HumanMessage' as const
    if (message.lc_id.includes('AIMessage')) return 'AIMessage' as const
    if (message.lc_id.includes('FunctionMessage'))
      return 'FunctionMessage' as const
    return 'Unknown' as const
  }

  const shouldContinue = (state: { messages: Array<BaseMessage> }) => {
    console.log('Passing through shouldContinue', '\n')
    // console.log(JSON.stringify(state, null, 2), '\n')
    const { messages } = state
    const lastMessage: HumanMessage | AIMessage | FunctionMessage =
      messages[messages.length - 1]

    const content = lastMessage.content as string

    const isSerial: boolean = isSerializableToObject(content)

    const message_type = baseType(lastMessage)

    console.log(
      'Understand lastMessage',
      JSON.stringify(lastMessage, null, 2),
      '\n',
      message_type
    )

    // If there is no function call, then we finish

    if (message_type === 'AIMessage') {
      if (
        lastMessage.additional_kwargs.tool_calls ||
        lastMessage.lc_kwargs.tool_calls
      ) {
        console.log('tools_call 1', lastMessage.additional_kwargs.tool_calls)
        console.log('tools_call 2', lastMessage.lc_kwargs.tool_calls)

        return 'get_topic'
      } else return 'end'
    }

    if (message_type === 'FunctionMessage') {
      const parsed = JSON.parse(content)
      const json_topic = topic_schema.parse(parsed)
      const { topic, sub_topic } = json_topic

      console.log('json_topic', topic, ' ', sub_topic)

      if (topic === 'medicine' && sub_topic === 'ambiguous') {
        return 'desambiguate'
      }
    }

    return 'end'
  }

  // Define the function to execute tools
  const _getAction = (state: { messages: Array<BaseMessage> }): AgentAction => {
    const { messages } = state
    // Based on the continue condition
    // we know the last message involves a function call
    const lastMessage = messages[messages.length - 1] as AIMessageChunk
    if (!lastMessage) {
      throw new Error('No messages found.')
    }
    if (!lastMessage.tool_calls) {
      throw new Error('No function call found in message.')
    }
    // We construct an AgentAction from the function_call
    const tool_spec = {
      tool: lastMessage.tool_calls[0].name,
      toolInput: lastMessage.tool_calls[0].args,
      log: lastMessage.tool_calls[0].id || ''
    }

    return tool_spec
  }

  // Define the function that calls the model
  const determine_topic = async (state: State, config?: RunnableConfig) => {
    console.log('GateKeeper -> determine_topic')
    console.log(JSON.stringify(state, null, 2), '\n')
    const { messages } = state

    const lastMessage = messages[messages.length - 1]

    const message_type = baseType(lastMessage)

    console.log(
      'Understand lastMessage',
      JSON.stringify(lastMessage, null, 2),
      '\n',
      message_type
    )

    // check persistance to see if we have already asked the user to clarify

    if (!lastMessage) {
      throw new Error('No messages found.')
    }
    if (lastMessage instanceof HumanMessage) {
      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          'You are a AI assistant with the solely mission to identify if a message by human falls into the subject of medicine. All queries related to anything related to medicine, healthcare, nutrition, nursery, dentistry, psicology, consider them as topic:  medicine, this is very important. If not, just consider them as general questions.'
        ],
        new MessagesPlaceholder('messages')
      ])

      const response = await prompt.pipe(newModel).invoke({ messages })
      // We return a list, because this will get added to the existing list
      return {
        messages: [response]
      }
    } else {
      return {
        messages: []
      }
    }
  }
  // Define the function that calls the model
  const desambiguate = async (state: State, config?: RunnableConfig) => {
    console.log(
      'Passing through Desambiguate -> desambiguate',
      JSON.stringify(state, null, 2),
      '\n'
    )
    const { messages } = state
    const lastMessage: HumanMessage | AIMessage | FunctionMessage =
      messages[messages.length - 1]

    // implement persistance

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are going to receive a stringified json with structure like {{topic: medicine, sub_topic: ambiguous, clarifying_question: Are you seeking 1) information on potential causes or 2) looking for emergency care guidelines?,
         options: [differential_diagnosis, emergency_guide], language: en}}. YOU must ask the user the clarifying question posing it just as it is in the json you have received, so the user can understand he/she has to select an option.`
      ],
      new MessagesPlaceholder('messages')
    ])

    try {
      const response = await prompt
        .pipe(model)
        .invoke({ messages: [lastMessage] })

      console.log('response', response)

      // We return a list, because this will get added to the existing list
      return {
        messages: [response]
      }
    } catch (error) {
      console.log('erroreor', error)
      return {
        messages: []
      }
    }
  }

  const determine_subtopic = async (state: State, config?: RunnableConfig) => {
    console.log(
      'Passing through MedExpert -> determine_subtopic',
      JSON.stringify(state, null, 2),
      '\n'
    )
    const action = _getAction(state)
    // We call the tool_executor and get back a response
    const toolResponse = await toolExecutor.invoke(action)

    // We use the response to create a ToolMessage
    const toolMessage = new ToolMessage({
      tool_call_id: action.log,
      content: toolResponse
    })
    console.log('toolMessage', toolMessage, '\n')
    // We return a list, because this will get added to the existing list
    return { messages: [toolMessage] }
  }

  // Define THE GRAPH

  const workflow = new StateGraph({
    channels: agentState
  })
    .addNode('GateKeeper', determine_topic)
    .addEdge(START, 'GateKeeper')
    .addNode('MedExpert', determine_subtopic)
    .addNode('Desambiguate', desambiguate)
    .addConditionalEdges('GateKeeper', shouldContinue, {
      // If `tools`, then we call the tool node.
      get_topic: 'MedExpert',
      desambiguate: 'Desambiguate',
      end: END
    })
    .addEdge('MedExpert', 'GateKeeper')
    .addEdge('Desambiguate', END)
  // Finally, we compile it!
  // This compiles it into a LangChain Runnable,
  // meaning you can use it as you would any other runnable

  // Initialize any compatible CheckPointSaver
  const memory = new MemorySaver()
  const app = workflow.compile({ checkpointer: memory })

  return app
}

// npx ts-node src/langgraph/get_medical_topic.ts

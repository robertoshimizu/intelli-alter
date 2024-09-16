import { ChatOpenAI } from '@langchain/openai'
import {
  HumanMessage,
  BaseMessage,
  AIMessage,
  AIMessageChunk,
  ToolMessage,
  MessageContent,
  SystemMessage
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
import { User, currentUser } from '@clerk/nextjs/server'
import {
  getMemory,
  isValidMemory,
  Memory,
  removeMemory,
  saveMemory
} from '../actions/kv_memory'
import { model_json } from './model-json'

export async function intelliGraph() {
  // Contemplate Google Provider, which doesn't have an id
  const user = (await currentUser()) as User
  if (user === null) {
    throw new Error('User not found')
  }
  console.log('User:', user.id)

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
    description: `This task involves identify the right topic for the user query and return a json like this: {"topic:  "medicine", "sub_topic": "health_technology_assessment"}.
    All queries related to anything related to medicine, healthcare, nutrition, nursery, dentistry, psicology, consider them as topic:  medicine, this is very important. 
    If not, just consider them as topic:  <name of topic non related to medicine>
                  `,
    schema: z.object({
      question: z.string().describe(
        `question is a string that represents the user query. It can be anything from a single word to a full sentence and it should contain the idea of what is questioned. 
          If the previous messages was disambiguation, then the question should be the answer to the clarifying question.`
      )
    }),
    func: async ({ question }) => {
      const runnable = model_json({ modelName: 'mistral-large' })
      const result = await runnable.invoke({
        input: question
      })

      return JSON.stringify(result) || '' // Ensure a string value is always returned, even if it is undefined
    }
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

  function baseType(
    message: HumanMessage | AIMessage | FunctionMessage | AIMessageChunk
  ) {
    if (message.lc_id.includes('HumanMessage')) return 'HumanMessage' as const
    if (message.lc_id.includes('AIMessage')) return 'AIMessage' as const
    if (message.lc_id.includes('FunctionMessage'))
      return 'FunctionMessage' as const
    if (message.lc_id.includes('AIMessageChunk'))
      return 'AIMessageChunk' as const
    if (message.lc_id.includes('ToolMessage')) return 'ToolMessage' as const
    return 'Unknown' as const
  }
  function get_json_topic(lastMessage: any) {
    const parsed = lastMessage as AIMessage
    const content = parsed.lc_kwargs.content
    console.log('content', content)

    const json_topic = topic_schema.parse(content)
    return json_topic
  }
  function getMostRecentHumanMessageContent(messages: BaseMessage[]): any {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i] instanceof HumanMessage) {
        return messages[i].content
      }
    }
    return undefined
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
    console.log('\n******************** TOPIC AGENT *******************')
    //console.log(JSON.stringify(state, null, 2), '\n')
    const { messages } = state

    const lastMessage = messages[messages.length - 1]

    const message_type = baseType(lastMessage)

    console.log(
      'Understand lastMessage',
      JSON.stringify(lastMessage, null, 2),
      '\n',
      message_type
    )

    if (!lastMessage) {
      throw new Error('No messages found.')
    }
    if (lastMessage instanceof HumanMessage) {
      // check persistance to see if we have already asked the user to clarify
      const memory = await getMemory({ userId: user.id })
      console.log('Memory retrieved from KV: ', memory)
      if (memory) {
        await removeMemory({ userId: user.id })
      }

      const memory_string = JSON.stringify(memory)

      let prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          `You are a AI assistant with the solely mission to identify if a message by human falls into the subject of medicine. 
          All queries related to anything related to medicine, healthcare, nutrition, nursery, dentistry, psicology, consider them as topic:  medicine, this is very important. 
          If not, just consider them as topic:  <name of topic non related to medicine>`
        ],
        new MessagesPlaceholder('messages')
      ])

      if (memory) {
        const new_system_message = new HumanMessage(
          `Eis minha opcao ${lastMessage.content} para desambiguar minha pergunta anterior: ${memory_string}`
        )
        messages.push(new_system_message)
      }

      //const response = await prompt.pipe(newModel).invoke({ messages })

      const runnable = model_json({ modelName: 'gpt-4o-mini' })
      const response = await runnable.invoke({
        input: lastMessage.content
      })
      console.log('\n ************************* response *********************')

      console.log('response', response)
      // We return a list, because this will get added to the existing list
      return {
        messages: [new AIMessage({ content: response })]
      }
    } else {
      return {
        messages: []
      }
    }
  }

  const determine_subtopic = async (state: State, config?: RunnableConfig) => {
    console.log(
      'Passing through TopicExpert -> determine_subtopic',
      JSON.stringify(state, null, 2),
      '\n'
    )
    const action = _getAction(state)
    // We call the tool_executor and get back a response
    const tools = [get_query_topic] as Array<StructuredTool>

    // @ts-ignore
    const toolExecutor = new ToolExecutor({ tools })

    const toolResponse = await toolExecutor.invoke(action)

    // We use the response to create a ToolMessage
    const toolMessage = new ToolMessage({
      tool_call_id: action.log,
      content: toolResponse,
      additional_kwargs: { args: action.toolInput }
    })
    console.log('toolMessage', toolMessage, '\n')
    // We return a list, because this will get added to the existing list
    return { messages: [toolMessage] }
  }
  // Define the function that calls the model
  const desambiguate = async (state: State, config?: RunnableConfig) => {
    const { messages } = state
    const lastMessage:
      | HumanMessage
      | AIMessage
      | FunctionMessage
      | ToolMessage = messages[messages.length - 1]
    console.log(
      'Passing through Desambiguate -> desambiguate',
      lastMessage,
      '\n'
    )
    // implement persistance

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are going to receive a stringified json with structure like {{topic: medicine, sub_topic: ambiguous, clarifying_question: Are you seeking 1) information on potential causes or 2) looking for emergency care guidelines?,
         options: [differential_diagnosis, emergency_guide], language: en}}. YOU must ask the user the clarifying question posing it just as it is in the json you have received, so the user can understand he/she has to select an option.`
      ],
      new MessagesPlaceholder('messages')
    ])

    const json_topic = get_json_topic(lastMessage)
    console.log('json_topic', json_topic)

    try {
      const model = new ChatOpenAI({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        streaming: false
      })
      const response = await prompt
        .pipe(model)
        .invoke({ messages: [new AIMessage(JSON.stringify(json_topic))] })

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

  const shouldContinueTopic = async (state: {
    messages: Array<BaseMessage>
  }) => {
    console.log(
      '\n******************** SHouldContinueTopic *******************'
    )
    // console.log(JSON.stringify(state, null, 2), '\n')
    const { messages } = state
    const lastMessage:
      | HumanMessage
      | AIMessage
      | FunctionMessage
      | ToolMessage
      | AIMessageChunk = messages[messages.length - 1]

    const content = lastMessage.content as string

    const isSerial: boolean = isSerializableToObject(content)

    const message_type = baseType(lastMessage)

    console.log(
      'Understand lastMessage',
      JSON.stringify(lastMessage, null, 2),
      '\n',
      message_type
    )

    const json_topic = get_json_topic(lastMessage)
    const { topic, sub_topic } = json_topic

    console.log('json_topic', topic, ' ', sub_topic)

    if (topic === 'medicine') {
      if (sub_topic === 'ambiguous') {
        if (isValidMemory(json_topic)) {
          console.log('Memory is valid')
          await saveMemory({ userId: user.id, payload: json_topic })
        } else console.log('Memory is not valid')
        return 'desambiguate'
      } else return 'modelAgent'
    } else return 'respond_back'
  }
  const getMedicaments = new DynamicStructuredTool({
    name: 'getMedicaments',
    description:
      'For detailed information on specific medications, including active ingredients, recommended dosages per condition, potential side effects, drug interactions, and contraindications. Use this prompt for pharmacological inquiries.',
    schema: z.object({
      nameOfMedicine: z
        .string()
        .describe(
          'name of the medication (active substances or commercial name) translated to the active substance in the English language. The translation to English language is mandatory.'
        )
    }),
    func: async ({ nameOfMedicine }) => {
      // const result = await get_medicaments(nameOfMedicine)
      return 'posologia da amoxicilina é 500mg a cada 8 horas.'.toString()
    }
  })

  const getTreatments = new DynamicStructuredTool({
    name: 'getTreatments',
    description:
      'For detailed information on specific treatments for a given disease or clinical condition.',
    schema: z.object({
      nameOfDisease: z
        .string()
        .describe(
          'name of the disease or clinical condition in the English language. The translation to English language is mandatory.'
        )
    }),
    func: async ({ nameOfDisease }) => {
      // const result = await get_Treatments(nameOfMedicine)
      return 'tratamento de asma usa berotec'.toString()
    }
  })

  // Define the function that calls the model
  const callModel = async (state: State, config?: RunnableConfig) => {
    const { messages } = state
    const lastMessage:
      | HumanMessage
      | AIMessage
      | FunctionMessage
      | ToolMessage = messages[messages.length - 1]
    console.log('\n******************** Model AGENT *******************')
    // implement persistance

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are going to receive a stringified json with structure like {{topic: medicine, sub_topic: medicaments, clarifying_question: 
         options: , language: en}}. Use this only as a reference. Look at the last messages and reflect on the dialogue, then try to answer what is being asked within the context of the conversation.`
      ],
      new MessagesPlaceholder('messages')
    ])

    const json_topic = get_json_topic(lastMessage)
    console.log('json_topic', json_topic)

    let tools: any = []
    let chosen_tool: any = 'getMedicaments'
    switch (json_topic.sub_topic) {
      case 'medications':
        tools = [getMedicaments]
        break
      case 'treatments':
        tools = [getTreatments]
        chosen_tool = 'getTreatments'
        break
      default:
        break
    }

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0
    }).bindTools(tools, {
      tool_choice: { type: 'function', function: { name: chosen_tool } }
    })

    const input = getMostRecentHumanMessageContent(messages)
    console.log('input', input)

    try {
      const response = await prompt.pipe(llm).invoke({ messages: [input] })

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

  const callTool = async (state: { messages: Array<BaseMessage> }) => {
    console.log('\n******************** callTool Model *******************')
    const action = _getAction(state)
    console.log('action', action)
    // We call the tool_executor and get back a response
    const tools = [getMedicaments, getTreatments] as Array<StructuredTool>

    // @ts-ignore
    const toolExecutor = new ToolExecutor({ tools })

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

  const shouldContinueModel = async (state: {
    messages: Array<BaseMessage>
  }) => {
    console.log(
      '\n******************** SHouldContinueModel *******************'
    )
    // console.log(JSON.stringify(state, null, 2), '\n')
    const { messages } = state
    const lastMessage:
      | HumanMessage
      | AIMessage
      | FunctionMessage
      | ToolMessage
      | AIMessageChunk = messages[messages.length - 1]

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

    if (message_type === 'AIMessage' || message_type === 'AIMessageChunk') {
      if (
        lastMessage.additional_kwargs.tool_calls ||
        lastMessage.lc_kwargs.tool_calls
      ) {
        console.log('tools_call 1', lastMessage.additional_kwargs.tool_calls)
        console.log('tools_call 2', lastMessage.lc_kwargs.tool_calls)
        return 'execute_model'
      }
      return 'end'
    }

    if (message_type === 'FunctionMessage' || message_type === 'ToolMessage') {
      console.log('ENTERING TOOL MESSAGE')

      return 'execute_model'
    }

    return 'end'
  }

  const respond = async (state: State, config?: RunnableConfig) => {
    const { messages } = state
    const lastMessage:
      | HumanMessage
      | AIMessage
      | FunctionMessage
      | ToolMessage = messages[messages.length - 1]

    console.log('\n******************** ResponseBack *******************')
    console.log('Passing through ResponseBack -> respond', lastMessage, '\n')

    try {
      const model = new ChatOpenAI({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        streaming: false
      })

      // We return a list, because this will get added to the existing list

      const message_type = baseType(lastMessage)
      if (
        message_type === 'FunctionMessage' ||
        message_type === 'ToolMessage'
      ) {
        if (message_type === 'ToolMessage') {
          const question = lastMessage.additional_kwargs.args
          const prompt = ChatPromptTemplate.fromMessages([
            ['system', 'Answer the question'],
            new MessagesPlaceholder('messages')
          ])
          const response = await prompt.pipe(model).invoke({
            // @ts-ignore
            messages: [new HumanMessage(question.question)]
          })

          console.log('response', response)
          return {
            messages: [new AIMessage(response)]
          }
        }
      }
      return {
        messages: [new AIMessage('Acabado')]
      }
    } catch (error) {
      console.log('erroreor', error)
      return {
        messages: []
      }
    }
  }

  // Define THE GRAPH

  const workflow = new StateGraph({
    channels: agentState
  })
    .addNode('TopicAgent', determine_topic)
    .addEdge(START, 'TopicAgent')
    .addNode('TopicExpert', determine_subtopic)
    .addNode('ModelAgent', callModel)
    .addNode('ModelExpert', callTool)
    .addNode('Desambiguate', desambiguate)
    .addNode('ResponseBack', respond)
    .addConditionalEdges('TopicAgent', shouldContinueTopic, {
      // If `tools`, then we call the tool node.
      get_topic: 'TopicExpert',
      desambiguate: 'Desambiguate',
      modelAgent: 'ModelAgent',
      respond_back: 'ResponseBack',
      end: END
    })
    .addEdge('ResponseBack', END)
    .addEdge('Desambiguate', END)
    .addEdge('TopicExpert', 'TopicAgent')
    .addConditionalEdges('ModelAgent', shouldContinueModel, {
      execute_model: 'ModelExpert',
      end: END
    })
    .addEdge('ModelExpert', 'ResponseBack')
    .addEdge('ModelAgent', END)
  // Finally, we compile it!
  // This compiles it into a LangChain Runnable,
  // meaning you can use it as you would any other runnable

  // Initialize any compatible CheckPointSaver
  const memory = new MemorySaver()
  const app = workflow.compile({ checkpointer: memory })

  return app
}

// npx ts-node src/langgraph/get_medical_topic.ts

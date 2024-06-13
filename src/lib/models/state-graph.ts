import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, BaseMessage } from '@langchain/core/messages'
import { END, StateGraph } from '@langchain/langgraph'
import { FunctionMessage } from '@langchain/core/messages'
import { AgentAction } from '@langchain/core/agents'
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts'
import { ToolExecutor } from '@langchain/langgraph/prebuilt'
import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { StructuredTool } from '@langchain/core/tools'

export async function stateGraph() {
  console.log('stateGraph...')
  // set up the tools
  const tools = [
    new TavilySearchResults({ maxResults: 1 })
  ] as Array<StructuredTool>

  // set up the tool executor
  // @ts-ignore
  const toolExecutor = new ToolExecutor({ tools })

  // set up the model
  // We will set streaming: true so that we can stream tokens
  // See the streaming section for more information on this.
  const model = new ChatOpenAI({
    temperature: 0,
    streaming: true
  })

  // we should make sure the model knows that it has these tools available to call.
  // We can do this by converting the LangChain tools into the format for OpenAI
  // function calling, and then bind them to the model class.

  const toolsAsOpenAIFunctions = tools.map((tool) =>
    convertToOpenAIFunction(tool)
  )
  const newModel = model.bind({
    functions: toolsAsOpenAIFunctions
  })

  // STATE GRAPH
  // This time, we'll use the more general StateGraph.
  // This graph is parameterized by a state object that it passes around to each node.
  // Remember that each node then returns operations to update that state.
  // These operations can either SET specific attributes on the state (e.g. overwrite the existing values)
  // or ADD to the existing attribute.
  // Whether to set or add is denoted by annotating the state object you construct the graph with.

  // Define the agent state, here we concatenate all messages
  const agentState = {
    messages: {
      value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
      default: () => []
    }
  }

  // Add nodes to the graph
  // In LangGraph, a node can be either a function or a runnable.
  // There are two main nodes we need for this:
  // - The agent: responsible for deciding what (if any) actions to take.
  // = A function to invoke tools: if the agent decides to take an action,
  // this node will then execute that action.

  // Edges
  // Conditional Edge: after the agent is called, we should either:
  // a. If the agent said to take an action, then the function to invoke tools should be called
  // b. If the agent said that it was finished, then it should finish
  // Normal Edge: after the tools are invoked, it should always go back to the agent to decide what to do next

  // Define the function that determines whether to continue or not
  const shouldContinue = (state: { messages: Array<BaseMessage> }) => {
    const { messages } = state
    const lastMessage = messages[messages.length - 1]
    // If there is no function call, then we finish
    if (
      !('function_call' in lastMessage.additional_kwargs) ||
      !lastMessage.additional_kwargs.function_call
    ) {
      return 'end'
    }
    // Otherwise if there is, we continue
    return 'continue'
  }

  // Define the function to execute tools
  const _getAction = (state: { messages: Array<BaseMessage> }): AgentAction => {
    const { messages } = state
    // Based on the continue condition
    // we know the last message involves a function call
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage) {
      throw new Error('No messages found.')
    }
    if (!lastMessage.additional_kwargs.function_call) {
      throw new Error('No function call found in message.')
    }
    // We construct an AgentAction from the function_call
    return {
      tool: lastMessage.additional_kwargs.function_call.name,
      toolInput: JSON.parse(
        lastMessage.additional_kwargs.function_call.arguments
      ),
      log: ''
    }
  }

  // Define the function that calls the model
  const callModel = async (state: { messages: Array<BaseMessage> }) => {
    const { messages } = state
    // You can use a prompt here to tweak model behavior.
    // You can also just pass messages to the model directly.
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant.'],
      new MessagesPlaceholder('messages')
    ])
    const response = await prompt.pipe(newModel).invoke({ messages })
    // We return a list, because this will get added to the existing list
    return {
      messages: [response]
    }
  }

  const callTool = async (state: { messages: Array<BaseMessage> }) => {
    const action = _getAction(state)
    // We call the tool_executor and get back a response
    const response = await toolExecutor.invoke(action)
    // We use the response to create a FunctionMessage
    const functionMessage = new FunctionMessage({
      content: response,
      name: action.tool
    })
    // We return a list, because this will get added to the existing list
    return { messages: [functionMessage] }
  }

  // Define THE GRAPH

  const workflow = new StateGraph({
    channels: agentState
  })

  // Define the two nodes we will cycle between
  workflow.addNode('agent', callModel)
  workflow.addNode('action', callTool)

  // Set the entrypoint as `agent`
  // This means that this node is the first one called
  workflow.setEntryPoint('agent')

  // We now add a conditional edge
  workflow.addConditionalEdges(
    // First, we define the start node. We use `agent`.
    // This means these are the edges taken after the `agent` node is called.
    'agent',
    // Next, we pass in the function that will determine which node is called next.
    shouldContinue,
    // Finally we pass in a mapping.
    // The keys are strings, and the values are other nodes.
    // END is a special node marking that the graph should finish.
    // What will happen is we will call `should_continue`, and then the output of that
    // will be matched against the keys in this mapping.
    // Based on which one it matches, that node will then be called.
    {
      // If `tools`, then we call the tool node.
      continue: 'action',
      // Otherwise we finish.
      end: END
    }
  )

  // We now add a normal edge from `tools` to `agent`.
  // This means that after `tools` is called, `agent` node is called next.
  workflow.addEdge('action', 'agent')

  // Finally, we compile it!
  // This compiles it into a LangChain Runnable,
  // meaning you can use it as you would any other runnable
  const app = workflow.compile()

  return app
}

async function main() {
  // Now we can call the app with some inputs

  const app = await stateGraph()

  const inputs = {
    messages: [new HumanMessage('what is the weather in sf')]
  }
  //const result = await app.invoke(inputs)
  for await (const output of await app.stream(inputs)) {
    console.log('output', output)
    console.log('-----\n')
  }
}

//main()

// npx ts-node src/lib/models/state-graph.ts

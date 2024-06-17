import { ChatOpenAI } from '@langchain/openai'
import {
  HumanMessage,
  BaseMessage,
  AIMessage,
  AIMessageChunk,
  ToolMessage
} from '@langchain/core/messages'
import { START, END, StateGraph } from '@langchain/langgraph'
import { FunctionMessage } from '@langchain/core/messages'
import { AgentAction } from '@langchain/core/agents'
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts'
import { ToolExecutor, ToolNode } from '@langchain/langgraph/prebuilt'
import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { StructuredTool } from '@langchain/core/tools'
import { ChatAnthropic } from '@langchain/anthropic'

export async function stateGraph() {
  console.log('stateGraph...')
  // set up the tools
  const tools = [
    new TavilySearchResults({ maxResults: 1 })
  ] as Array<StructuredTool>

  // set up the tool executor
  // @ts-ignore
  const toolExecutor = new ToolExecutor({ tools })

  //const toolExecutor = new ToolNode<BaseMessage[]>(tools)

  // set up the model
  // We will set streaming: true so that we can stream tokens
  // See the streaming section for more information on this.

  const model = new ChatOpenAI({
    temperature: 0,
    streaming: true
  })

  // const model = new ChatAnthropic({
  //   model: 'claude-3-haiku-20240307',
  //   temperature: 0,
  //   streaming: true
  // })

  // we should make sure the model knows that it has these tools available to call.
  // We can do this by converting the LangChain tools into the format for OpenAI
  // function calling, and then bind them to the model class.

  // const toolsAsOpenAIFunctions = tools.map((tool) =>
  //   convertToOpenAIFunction(tool)
  // )
  // const newModel = model.bind({
  //   functions: toolsAsOpenAIFunctions
  // })

  const newModel = model.bindTools(tools)

  // STATE GRAPH
  // This time, we'll use the more general StateGraph.
  // This graph is parameterized by a state object that it passes around to each node.
  // Remember that each node then returns operations to update that state.
  // These operations can either SET specific attributes on the state (e.g. overwrite the existing values)
  // or ADD to the existing attribute.
  // Whether to set or add is denoted by annotating the state object you construct the graph with.

  // Define the agent state, here we concatenate all messages
  interface AgentState {
    messages: Array<BaseMessage>
  }

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
    console.log('shouldContinue ...')
    const { messages } = state
    const lastMessage: any = messages[messages.length - 1]
    // If there is no function call, then we finish

    console.log('Should Continue lastMessage', lastMessage, '\n')
    console.log(
      'Should Continue ',
      lastMessage?.lc_kwargs.tool_calls.length === 0,
      '\n'
    )
    // If there is no tool call, then we finish
    if (lastMessage?.lc_kwargs.tool_calls.length === 0) {
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
    const lastMessage = messages[messages.length - 1] as AIMessageChunk
    if (!lastMessage) {
      throw new Error('No messages found.')
    }

    //console.log('lastMessage GET Action', lastMessage)
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
  const callModel = async (state: { messages: Array<BaseMessage> }) => {
    console.log('Call Model ...')
    const { messages } = state
    console.log('messages callModel', JSON.stringify(messages))
    // You can use a prompt here to tweak model behavior.
    // You can also just pass messages to the model directly.
    const prompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder('messages')
    ])
    const response = await prompt.pipe(newModel).invoke({ messages })

    console.log('CallModel response', JSON.stringify(response), '\n')
    // We return a list, because this will get added to the existing list
    return {
      messages: [response]
    }
  }

  const callTool = async (state: { messages: Array<BaseMessage> }) => {
    console.log('callTool ...')
    const action = _getAction(state)
    console.log('action', JSON.stringify(action))
    // We call the tool_executor and get back a response
    const toolResponse = await toolExecutor.invoke(action)
    console.log('Tool response', JSON.stringify(toolResponse), '\n')

    // We use the response to create a FunctionMessage
    const toolMessage = new ToolMessage({
      tool_call_id: action.log,
      content: toolResponse
    })
    console.log('toolMessage', toolMessage, '\n')
    // We return a list, because this will get added to the existing list
    return { messages: [toolMessage] }
  }

  // Define THE GRAPH

  const workflow = new StateGraph<AgentState, unknown, string>({
    channels: agentState
  })

  // Define the two nodes we will cycle between
  workflow.addNode('agent', callModel)
  workflow.addNode('action', callTool)

  // Set the entrypoint as `agent`
  // This means that this node is the first one called
  workflow.addEdge(START, 'agent')
  //workflow.addEdge('agent', END)

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

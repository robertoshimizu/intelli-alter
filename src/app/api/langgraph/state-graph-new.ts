import { ChatOpenAI } from '@langchain/openai'
import {
  Annotation,
  END,
  MessagesAnnotation,
  START,
  StateGraph
} from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'
import { convertToOpenAIFunction } from '@langchain/core/utils/function_calling'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { StructuredTool } from '@langchain/core/tools'

// Set up the tools
const tools = [
  new TavilySearchResults({ maxResults: 1 })
] as Array<StructuredTool>

// Convert tools to OpenAI functions
const toolsAsOpenAIFunctions = tools.map((tool) =>
  convertToOpenAIFunction(tool)
)

// Set up the model
const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  streaming: true
}).bind({
  functions: toolsAsOpenAIFunctions
})

// Define the agent state using Annotation
const agentState = Annotation.Root({
  ...MessagesAnnotation.spec,
  memory: Annotation<any | null>({
    reducer: (x?: any | null, y?: any | null) => y ?? x,
    default: () => null
  }),
  topic: Annotation<any | null>({
    reducer: (x?: any | null, y?: any | null) => y ?? x,
    default: () => null
  }),
  input: Annotation<any | null>({
    reducer: (x?: any | null, y?: any | null) => y ?? x,
    default: () => ''
  })
})

// Type for agent state
type AgentState = typeof agentState.State

// Define the function that determines whether to continue or not

const shouldContinue = (state: AgentState) => {
  const { messages } = state

  const lastMessage = messages[messages.length - 1]

  //console.log('\n ShouldContinue lastMessage:', lastMessage)

  // If there is a function call, we continue to tools
  if (
    'function_call' in lastMessage.additional_kwargs &&
    lastMessage.additional_kwargs.function_call
  ) {
    return 'tools'
  }
  // Otherwise, we end
  return 'end'
  // if (
  //   lastMessage._getType() !== 'ai' ||
  //   !(lastMessage as AIMessage).tool_calls?.length
  // ) {
  //   // LLM did not call any tools, or it's not an AI message, so we should end.
  //   return 'end'
  // }
  // return 'tools'
}

// Define the function that calls the model
async function callModel(state: AgentState) {
  const { messages } = state

  const lastMessage = messages[messages.length - 1]

  //console.log('\n CallModel lastMessage:', lastMessage)

  const response = await model.invoke([
    {
      role: 'system',
      content: `You are a helpful assistant. For every question, research, get the results, reflect on the question to craft the response, and then respond the best way you can.`
    },
    ...state.messages
  ])

  //console.log('\n CallModel response:', response)

  // Return the updated messages
  return { messages: response }
}

// Create an instance of ToolNode
const toolNodeForGraph = new ToolNode(tools)

// Define the graph
const workflow = new StateGraph(agentState)
  // Add nodes
  .addNode('callModel', callModel)
  .addNode('tools', toolNodeForGraph)
  // Set the entry point
  .addEdge(START, 'callModel')
  // Add conditional edges
  .addConditionalEdges('callModel', shouldContinue, {
    tools: 'tools',
    end: END
  })
  // Add edge from tools to callModel
  .addEdge('tools', 'callModel')

// Compile the graph
export const app = workflow.compile()

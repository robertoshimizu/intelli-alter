import {
  AIStreamCallbacksAndOptions,
  AIStreamParser,
  AIStreamParserOptions,
  LangChainAdapter,
  StreamingTextResponse
} from 'ai'
import { stateGraph } from '@/lib/models/state-graph'
import {
  HumanMessage,
  AIMessage,
  SystemMessage
} from '@langchain/core/messages'
import { toAIStream } from '@/lib/adapter/langgraph-adapter'
import { intelliGraph } from '@/lib/models/intelli-graph'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  id: string
}

export async function POST(req: Request) {
  const prompt = await req.json() // Assuming modelType is provided in the request

  const { messages, data } = prompt

  const inputMessages = messages.map((message: Message) => {
    if (message.role === 'user') {
      return new HumanMessage(message.content)
    } else if (message.role === 'assistant') {
      return new AIMessage(message.content)
    }
  })
  if (inputMessages.length === 1) {
    inputMessages.unshift(
      new SystemMessage(
        'Você é um assistente de IA e responde a qualquer pergunta de maneira sucinta. Suas respostas devem ser escritas em formato markdown.'
      )
    )
  }

  const app = await stateGraph()
  //const app = await intelliGraph()

  const inputs = {
    messages: inputMessages
  }

  let config = { configurable: { thread_id: 'conversation-num-1' } }

  const graph = await app.streamEvents(inputs, {
    ...config,
    streamMode: 'values',
    version: 'v1'
  })

  try {
    const aiStream = toAIStream(graph, {
      onStart: async () => {
        console.log('Stream Initializad...')
      },
      onCompletion: async (completion) => {
        console.log('Completion going:', completion)
      },
      onFinal: async (completion) => {
        console.log('Stream COMPLTETED', completion)
      },
      onToken: async (token) => {
        //console.log('Token received', token)
      },
      onText: async (text) => {
        //console.log('Text received', text)
      }
    })

    return new StreamingTextResponse(aiStream, {})
    //return LangChainAdapter.toDataStreamResponse(aiStream)
  } catch (error) {
    console.error('Error Streaming:', error)
    return new Response('Error', { status: 501 })
  }
}

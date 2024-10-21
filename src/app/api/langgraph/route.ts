import { LangChainAdapter, StreamingTextResponse, streamText } from 'ai'

import {
  HumanMessage,
  AIMessage,
  SystemMessage
} from '@langchain/core/messages'
import { toAIStream } from '@/lib/adapter/langgraph-adapter'
import { app } from './state-graph-new'

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

  console.log('\n Messages received from frontend:\n', prompt)

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

  const inputs = {
    messages: inputMessages
  }

  let config = { configurable: { thread_id: 'conversation-num-1' } }

  // streamEvents is a langgraph method that takes the inputs and config
  const graph = await app.streamEvents(inputs, {
    ...config,
    streamMode: 'values',
    version: 'v2' as const
  })

  // Here I make the bridge from Langgraph to Vercel AI SDK Core
  // to AIStream is customized to work with Langgraph

  try {
    const aiStream = toAIStream(graph, {
      onStart: async () => {
        console.log('Stream Initializad...')
      },
      onCompletion: async (completion) => {
        //console.log('Completion going:', completion)
      },
      onFinal: async (completion) => {
        console.log('Stream COMPLTETED...')
      },
      onToken: async (token) => {
        //console.log('Token received', token)
      },
      onText: async (text) => {
        //console.log('Text received', text)
      }
    })

    return new StreamingTextResponse(aiStream, {})
    //return LangChainAdapter.toDataStreamResponse(aiStream) // does not work with langgraph
  } catch (error) {
    console.error('Error Streaming:', error)
    return new Response('Error', { status: 501 })
  }
}

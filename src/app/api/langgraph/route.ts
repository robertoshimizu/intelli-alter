import { LangChainAdapter, StreamingTextResponse } from 'ai'

import { chatModel } from '@/lib/models/langchain_llms'
import { transformMessages } from '@/lib/models/adapters'
import { agentJack } from '@/lib/models/state-graph'
import { HumanMessage } from '@langchain/core/messages'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const prompt = await req.json() // Assuming modelType is provided in the request

  const { messages, data } = prompt

  console.log(messages)

  const app = await agentJack()

  const messagese = transformMessages(messages)

  const inputs = {
    messages: [new HumanMessage('what is the weather in la')]
  }

  for await (const output of await app.stream(inputs)) {
    console.log('output', output)
    console.log('-----\n')
  }

  const stream = await app.stream(inputs)

  const aiStream = LangChainAdapter.toAIStream(stream, {
    onStart: () => {
      console.log('Starting...')
    },
    onCompletion: () => {
      console.log('Completed!')
    },
    onFinal: () => {
      console.log('Final!')
    }
  })

  //return new StreamingTextResponse(aiStream, {}, data)

  return new StreamingTextResponse(aiStream)
}

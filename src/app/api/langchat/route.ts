import { LangChainAdapter, StreamingTextResponse } from 'ai'

import { chatModel } from '@/lib/models/langchain_llms'
import { transformMessages } from '@/lib/models/adapters'

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

  const modelType = 'mixtral-8x7B'

  const model = chatModel(modelType).withConfig({
    runName: 'langchain-llms'
  })

  const messagese = transformMessages(messages)

  const stream = await model.stream(messagese)

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

import { LangChainAdapter, StreamingTextResponse } from 'ai'

import { chatModel } from '@/lib/models/langchain_llms'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const { prompt } = await req.json() // Assuming modelType is provided in the request

  const { messages, data } = prompt

  const modelType = 'mixtral-8x7B'

  const model = chatModel(modelType).withConfig({
    runName: 'langchain-llms'
  })

  const stream = await model.stream(prompt)

  const aiStream = LangChainAdapter.toAIStream(stream)

  //return new StreamingTextResponse(aiStream, {}, data)

  return new StreamingTextResponse(aiStream)
}

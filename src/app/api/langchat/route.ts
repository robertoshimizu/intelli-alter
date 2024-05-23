import { StreamingTextResponse, streamText, StreamData } from 'ai'

import { llm_model } from '@/lib/models/llm'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export async function POST(req: Request) {
  const request = await req.json() // Assuming modelType is provided in the request
  //console.log(request)

  const { messages, data } = request

  const model = llm_model(data.model)

  const result = await streamText({
    model,
    temperature: 0.0,
    system:
      'You are a helpful assistant that can answer questions and provide information. You must always answer in language of the user and provide accurate information.',
    messages
  })

  // data = new StreamData()

  // data.append({ test: 'value' })

  // const stream = result.toAIStream({
  //   onFinal(_) {
  //     data.close()
  //   }
  // })
  const stream = result.toAIStream()

  // return new StreamingTextResponse(stream, {}, data)
  return new StreamingTextResponse(stream, {})
}

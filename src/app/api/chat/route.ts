import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText, StreamData } from 'ai'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages
  })

  const data = new StreamData()

  data.append({ test: 'value' })

  const stream = result.toAIStream({
    onFinal(_) {
      data.close()
    }
  })

  return new StreamingTextResponse(stream, {}, data)
}

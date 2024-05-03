import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages
  })

  return new StreamingTextResponse(result.toAIStream())
}

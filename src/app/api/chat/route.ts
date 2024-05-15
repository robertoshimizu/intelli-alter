import { openai } from '@ai-sdk/openai'
import { createMistral } from '@ai-sdk/mistral'
import { createGoogleGenerativeAI, google } from '@ai-sdk/google'
import { StreamingTextResponse, streamText, StreamData } from 'ai'

// Set the runtime to edge for best performance
export const runtime = 'edge'

// Create instances of models
const mistralInstance = createMistral({
  // custom settings
})

export async function POST(req: Request) {
  const request = await req.json() // Assuming modelType is provided in the request
  //console.log(request)

  const { messages, data } = request

  const modelType: string = data.model

  // Dynamically selecting the model based on modelType
  let model
  switch (modelType) {
    case 'mistral':
      model = mistralInstance('mistral-large-latest', {
        safePrompt: true // optional safety prompt injection
      })
      break
    case 'openai':
      model = openai.chat('gpt-3.5-turbo', {
        logitBias: {
          // optional likelihood for specific tokens
          '50256': -100
        },
        user: 'test-user' // optional unique user identifier
      })
      break
    case 'gemini':
      const google = createGoogleGenerativeAI()
      model = google('models/gemini-1.5-pro-latest')
      break

    default:
      throw new Error(`Unsupported model type: ${modelType}`)
  }

  console.log('Selected model:', modelType)

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

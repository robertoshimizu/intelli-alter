import { openai } from '@ai-sdk/openai'
import { createMistral } from '@ai-sdk/mistral'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export function llm_model(modelType: string) {
  // Dynamically selecting the model based on modelType
  let model
  switch (modelType) {
    case 'mistral-large':
      // Create instances of models
      const mistralInstance = createMistral({
        // custom settings
      })
      model = mistralInstance('mistral-large-latest', {
        safePrompt: true // optional safety prompt injection
      })
      break
    case 'gpt-3.5-turbo':
      model = openai.chat('gpt-3.5-turbo', {
        logitBias: {
          // optional likelihood for specific tokens
          '50256': -100
        },
        user: 'test-user' // optional unique user identifier
      })
      break
    case 'gpt-4o-mini':
      model = openai.chat('gpt-4o-mini')
      break
    case 'o1-preview':
      model = openai.chat('o1-preview')
      break
    case 'gemini':
      const google = createGoogleGenerativeAI()
      model = google('models/gemini-1.5-pro-latest')
      break

    default:
      throw new Error(`Unsupported model type: ${modelType}`)
  }

  console.log('Selected model:', modelType)

  return model
}

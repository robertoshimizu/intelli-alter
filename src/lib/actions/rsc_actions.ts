'use server'

import { generateText } from 'ai'
import { createMistral } from '@ai-sdk/mistral'

export async function getAnswer(question: string) {
  const mistralInstance = createMistral({
    // custom settings
  })
  const model = mistralInstance('open-mixtral-8x7b', {
    safePrompt: true // optional safety prompt injection
  })
  const { text, finishReason, usage } = await generateText({
    model,
    prompt: question
  })

  return { text, finishReason, usage }
}

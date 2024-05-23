'use server'

import { streamText, generateText } from 'ai'
import { createMistral } from '@ai-sdk/mistral'
import { createStreamableValue } from 'ai/rsc'

export async function generate(input: string) {
  'use server'

  const stream = createStreamableValue('')

  ;(async () => {
    const mistralInstance = createMistral({
      // custom settings
    })
    const model = mistralInstance('open-mixtral-8x7b', {
      safePrompt: true // optional safety prompt injection
    })
    const { textStream } = await streamText({
      model,
      prompt: input
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function continueConversation(history: Message[]) {
  'use server'

  const mistralInstance = createMistral({
    // custom settings
  })
  const model = mistralInstance('open-mixtral-8x7b', {
    safePrompt: true // optional safety prompt injection
  })

  const { text } = await generateText({
    model,
    system: 'You are a friendly assistant!',
    messages: history
  })

  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content: text
      }
    ]
  }
}

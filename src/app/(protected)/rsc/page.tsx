'use client'

import { useState } from 'react'
import { generate } from '@/lib/actions/rsc_actions'
import { readStreamableValue } from 'ai/rsc'

export default function Home() {
  const [generation, setGeneration] = useState<string>('')

  return (
    <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Tools using RSC Streaming</h1>
      <button
        onClick={async () => {
          const { output } = await generate('Why is the sky blue?')

          for await (const delta of readStreamableValue(output)) {
            setGeneration((currentGeneration) => `${currentGeneration}${delta}`)
          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { generate } from '@/lib/actions/rsc_actions'
import { readStreamableValue } from 'ai/rsc'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [generation, setGeneration] = useState<string>('')
  const query = 'Why is the sky blue?'

  return (
    <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Tools using RSC Streaming</h1>
      <Button
        className="my-4"
        onClick={async () => {
          const { output } = await generate(query)

          for await (const delta of readStreamableValue(output)) {
            setGeneration((currentGeneration) => `${currentGeneration}${delta}`)
          }
        }}
      >
        {query}
      </Button>

      <div>{generation}</div>
    </div>
  )
}

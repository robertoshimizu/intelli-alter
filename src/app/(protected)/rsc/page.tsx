'use client'

import { useState } from 'react'
import { getAnswer } from '@/lib/actions/rsc_actions'

export default function Home() {
  const [generation, setGeneration] = useState<string>('')

  return (
    <div>
      <button
        onClick={async () => {
          const { text } = await getAnswer('Why is the sky blue?')
          setGeneration(text)
        }}
      >
        Answer
      </button>
      <div>{generation}</div>
    </div>
  )
}

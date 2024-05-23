'use client'

import { useState } from 'react'
import { Message, continueConversation } from '@/lib/actions/rsc_actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')

  return (
    <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Chat with RSC</h1>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <div>
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
          }}
        />
        <Button
          onClick={async () => {
            const { messages } = await continueConversation([
              ...conversation,
              { role: 'user', content: input }
            ])

            setConversation(messages)
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  )
}

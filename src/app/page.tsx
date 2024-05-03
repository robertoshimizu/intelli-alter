'use client'
import Image from 'next/image'
import { useChat } from 'ai/react'
import { TitleLogoLight } from './components/ui/logos'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: '/api/chat'
  })
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

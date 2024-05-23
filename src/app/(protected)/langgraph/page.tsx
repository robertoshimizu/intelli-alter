'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

export default function ChatPage() {
  const [model, setModel] = useState('gemini') // Default model

  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: '/api/langgraph',
    body: {
      data: {
        model: model
      }
    },
    sendExtraMessageFields: true,
    streamMode: 'stream-data'
  })

  const handleModelChange = (event: any) => {
    setModel(event.target.value)
  }

  return (
    <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Langgraph</h1>
      {/* Model selection dropdown */}
      <div className="mb-4">
        <select
          value={model}
          onChange={handleModelChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="mistral">Mistral</option>
          <option value="openai">OpenAI</option>
          <option value="gemini">Gemini</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </div>

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

'use client'

import { useCompletion } from 'ai/react'
import { useState } from 'react'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

export default function ChatPage() {
  const [model, setModel] = useState('gemini') // Default model

  const { completion, input, handleInputChange, handleSubmit, data } =
    useCompletion({
      api: '/api/langchat',
      body: {
        data: {
          model: model
        }
      }
    })

  const handleModelChange = (event: any) => {
    setModel(event.target.value)
  }

  return (
    <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Langchat</h1>
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

      {completion}

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

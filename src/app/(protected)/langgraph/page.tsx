'use client'

import { useState } from 'react'
import { Message, useChat } from '@ai-sdk/react'
import { ChatMessage } from '@/components/chat-message'
import { Separator } from '@/components/ui/separator'

export default function ChatPage() {
  const [model, setModel] = useState('openai') // Default model

  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat({
      api: '/api/langgraph',
      body: {
        data: {
          model: model
        }
      },
      sendExtraMessageFields: true,
      streamMode: 'stream-data',
      onResponse: (response: Response) => {
        console.log('Received response from server:', response)
      },
      onFinish: (message: Message) => {
        console.log('Finished streaming message:', message)
      },
      onError: (error: Error) => {
        console.error('An error occurred:', error)
      }
    })

  const handleModelChange = (event: any) => {
    setModel(event.target.value)
  }

  return (
    <div className="flex flex-col w-full max-w-xl py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Langgraphe</h1>
      {/* Model selection dropdown */}

      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage isLoading={isLoading} message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-xl p-2 mb-8 border border-gray-300 rounded shadow-xl "
          value={input}
          placeholder="diga algo ..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

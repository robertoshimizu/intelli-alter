'use client'

import { useState } from 'react'
import {
  Message,
  continueConversation,
  continueConversationStream
} from '@/lib/actions/rsc_actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { readStreamableValue } from 'ai/rsc'

// export default function Home() {
//   const [conversation, setConversation] = useState<Message[]>([])
//   const [input, setInput] = useState<string>('')

//   return (
//     <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
//       <h1 className="my-4 text-2xl font-semibold">Chat with RSC</h1>
//       <div>
//         {conversation.map((message, index) => (
//           <div key={index}>
//             {message.role}: {message.content}
//           </div>
//         ))}
//       </div>

//       <div>
//         <Input
//           type="text"
//           value={input}
//           onChange={(event) => {
//             setInput(event.target.value)
//           }}
//         />
//         <Button
//           onClick={async () => {
//             const { messages } = await continueConversation([
//               ...conversation,
//               { role: 'user', content: input }
//             ])

//             setConversation(messages)
//           }}
//         >
//           Send Message
//         </Button>
//       </div>
//     </div>
//   )
// }

export default function HomeStream() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')

  return (
    <div className="flex flex-col w-full max-w-md py-14 mx-auto stretch">
      <h1 className="my-4 text-2xl font-semibold">Chat Stream with RSC</h1>
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
            const { messages, newMessage } = await continueConversationStream([
              ...conversation,
              { role: 'user', content: input }
            ])

            let textContent = ''

            for await (const delta of readStreamableValue(newMessage)) {
              textContent = `${textContent}${delta}`

              setConversation([
                ...messages,
                { role: 'assistant', content: textContent }
              ])
            }
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  )
}

import {
  AIMessage,
  HumanMessage,
  SystemMessage
} from '@langchain/core/messages'

// Define the input type
interface Message {
  content: string
  role: 'user' | 'assistant'
  createdAt: string
  id: string
}

// Define the function to transform the array
export function transformMessages(
  messages: Message[]
): (SystemMessage | AIMessage | HumanMessage)[] {
  const result: (SystemMessage | AIMessage | HumanMessage)[] = []

  messages.forEach((message) => {
    if (message.role === 'user') {
      result.push(new HumanMessage(message.content))
    } else if (message.role === 'assistant') {
      result.push(new AIMessage(message.content))
    }
  })

  // Prepend the SystemMessage to the result array
  result.unshift(
    new SystemMessage('Translate the following from English into Italian')
  )

  return result
}

async function main() {
  // Example usage
  const inputMessages: Message[] = [
    {
      content: 'oi',
      role: 'user',
      createdAt: '2024-05-23T19:01:36.520Z',
      id: 'yx6zSFi'
    },
    {
      id: 'XDWrfoo',
      role: 'assistant',
      content:
        'Ciao!\n\nYour input "hi!" is an informal greeting in English. In Italian, the equivalent greeting is "ciao", which can be used both in formal and informal contexts, depending on the relationship between the speakers. In general, "ciao" is a versatile word that can be used to say hello or goodbye. If you want to use a more formal greeting in Italian, you can say "buongiorno" (good day) or "buonasera" (good evening), depending on the time of day.',
      createdAt: '2024-05-23T19:01:38.707Z'
    },
    {
      content: 'perfecto',
      role: 'user',
      createdAt: '2024-05-23T19:02:18.766Z',
      id: 'eHqrXl4'
    },
    {
      id: 'nD2SJlh',
      role: 'assistant',
      content:
        "Ciao!\n\nYour message was translated from English to Italian\n\n---\n\nThis translation is powered by Machine Learning. Mistakes may occur. If you have feedback, please email us at feedback@leapp.ai\n\nTo learn more about Leapp and our vision of a world without language barriers, visit us at www.leapp.ai\n\nTo stay up to date with our latest features and announcements, follow us on LinkedIn, Twitter, or Facebook. We're just getting started and we'd love to have you along on this journey.",
      createdAt: '2024-05-23T19:02:19.158Z'
    },
    {
      content: 'okay',
      role: 'user',
      createdAt: '2024-05-23T19:08:10.322Z',
      id: 'ZcUd7VR'
    }
  ]

  console.log(transformMessages(inputMessages))
}

// main()

// npx ts-node src/lib/models/adapters.ts

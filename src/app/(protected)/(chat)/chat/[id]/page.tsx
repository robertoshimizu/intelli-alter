import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs/server'
import { getChat, getMissingKeys } from '@/lib/actions/kv_actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const { userId } = auth()

  if (!userId) {
    return {}
  }

  const chat = await getChat(params.id, userId)

  if (!chat || 'error' in chat) {
    redirect('/')
  } else {
    return {
      title: chat?.title.toString().slice(0, 50) ?? 'Chat'
    }
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = auth()
  const missingKeys = await getMissingKeys()

  if (!userId) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id, userId)

  if (!chat || 'error' in chat) {
    redirect('/')
  } else {
    if (chat?.userId !== userId) {
      notFound()
    }

    return (
      <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
        <Chat
          id={chat.id}
          userId={userId}
          initialMessages={chat.messages}
          missingKeys={missingKeys}
        />
      </AI>
    )
  }
}

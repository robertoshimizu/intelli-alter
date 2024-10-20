import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@clerk/nextjs/server'
import { getMissingKeys } from '@/lib/actions/kv_actions'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const { userId } = auth()
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} userId={userId ?? ''} missingKeys={missingKeys} />
    </AI>
  )
}

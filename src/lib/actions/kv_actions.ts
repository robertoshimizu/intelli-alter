'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@clerk/nextjs/server'
import { type Chat } from '@/lib/types'

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}
/**
 * Get chat/messages by id from KV database
 * @param {string} id - Chat id
 * @param {string} userId - User id
 * @returns {Chat | null} - Chat object or null
 *
 */
export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized'
    }
  }

  //Convert uid to string for consistent comparison with session.user.id
  const uid = String(await kv.hget(`chat:${id}`, 'userId'))

  if (uid !== userId) {
    return {
      error: 'Unauthorized'
    }
  }

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${userId}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1)
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${userId}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || chat.userId !== userId) {
    return {
      error: 'Something went wrong'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}

export async function saveChat(chat: Chat) {
  const { userId } = auth()

  if (userId) {
    const pipeline = kv.pipeline()
    pipeline.hmset(`chat:${chat.id}`, chat)
    pipeline.zadd(`user:chat:${chat.userId}`, {
      score: Date.now(),
      member: `chat:${chat.id}`
    })
    await pipeline.exec()
  } else {
    return
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}
/**
 *
 * Get OpenAI API key from environment variables
 * @returns {string[]} - List of missing environment variables
 */
export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map((key) => (process.env[key] ? '' : key))
    .filter((key) => key !== '')
}

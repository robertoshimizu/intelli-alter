'use server'

import { kv } from '@vercel/kv'

/**
 * Memory object of the thread.
 * @param topic Topic.
 * @param sub_topic Sub-topic.
 * @param clarifying_question Clarifying question.
 * @param options Options.
 * @param language Language of the thread
 */
export interface Memory {
  topic?: string
  sub_topic?: string
  clarifying_question?: string
  options?: any
  language?: string
}

export type MemoryRecord = {
  [K in keyof Memory]: string
}

/**
 * Check if memory object is valid.
 * @param object Memory object to validate.
 */
export function isValidMemory(object: any): boolean {
  return (
    (!object.topic || typeof object.topic === 'string') &&
    (!object.sub_topic || typeof object.sub_topic === 'string') &&
    (!object.clarifying_question ||
      typeof object.clarifying_question === 'string') &&
    (!object.language || typeof object.language === 'string')
  )
}
export async function convertMemoryToRecord(
  memory: Memory
): Promise<MemoryRecord> {
  return {
    topic: memory.topic || '', // Use an empty string if undefined
    sub_topic: memory.sub_topic || '', // Use an empty string if undefined
    clarifying_question: memory.clarifying_question || '', // Use an empty string if undefined
    options: memory.options ? JSON.stringify(memory.options) : '[]', // Serialize array to a JSON string
    language: memory.language || '' // Use an empty string if undefined
  }
}

/**
 * Save memory object to KV.
 * @param userId User KV ID to save memory to.
 
 */
export async function saveMemory({
  userId,
  payload
}: {
  userId: string
  payload: Memory
}): Promise<boolean> {
  try {
    // Convert the payload to a JSON string
    const payloadString = JSON.stringify(payload)

    // Store the JSON string in Redis
    await kv.set(`memory:${userId}`, payloadString)
    console.log('Memory id: ', userId, ' saved!')
    return true
  } catch (error) {
    console.error('Error saving memory', error)
    return false
  }
}

/**
 * Retrieve memory object from KV.
 * @param userId User KV ID to retrieve memory from.
 */
export async function getMemory({
  userId
}: {
  userId: string
}): Promise<Memory | null> {
  try {
    // Retrieve the JSON string from Redis
    const payloadString = (await kv.get(`memory:${userId}`)) as Memory

    console.log('payloadString: ', payloadString)

    return payloadString
  } catch (error) {
    console.error('Error retrieving memory', error)
    return null
  }
}

/**
 * Remove memory object from KV.
 * @param userId User KV ID to remove memory from.
 */
export async function removeMemory({ userId }: { userId: string }) {
  try {
    await kv.del(`memory:${userId}`)
    console.log('Memory id: ', userId, ' removed!')
  } catch (error) {
    console.error('Error removing memory', error)
    return false
  }
}

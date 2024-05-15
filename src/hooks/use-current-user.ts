'use client'

import { useSession } from 'next-auth/react'
/**
 * Get the current user session using client side hook.
 * @returns {Object} The current user object.
 */
export default function useCurrentUser() {
  const session = useSession()
  return session.data?.user
}

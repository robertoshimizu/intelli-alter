// reusable functions of the auth lib

import { auth } from '@/auth'

/**
 * Get the current user session using server side.
 * @returns {Promise} The current user object.
 */
export const currentUser = async () => {
  const session = await auth()
  return session?.user
}

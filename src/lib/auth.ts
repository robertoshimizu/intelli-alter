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

/**
 * Get the current user role using server side.
 * @returns {Promise} The current user' role.
 */
export const currentRole = async () => {
  const session = await auth()
  return session?.user.role
}

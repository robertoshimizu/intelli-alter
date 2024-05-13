'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'User not found!' }
  }

  console.log('existingToken: ', existingToken)

  try {
    await db.user.update({
      where: { email: existingToken.email },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    })
  } catch (error) {
    console.error('Error verifying email: ', error)
    return { error: 'Error verifying email!' }
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success: 'Email verified!' }
}

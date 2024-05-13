'use server'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email) {
    return { error: 'Email not found in our records' }
  }

  // TODO: Generate a token and send a reset email

  return { success: 'Reset email sent!' }
}

'use server'

import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import * as z from 'zod'
import bcrypt from 'bcrypt'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  // verify if email is already in use
  const existingUser = await db.user.findFirst({
    where: { email }
  })

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  // TODO: send email verification token email

  return { success: 'New account created!' }
}

'use server'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email or password do not match in our records' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )
    return { success: 'Confirmation email sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('AUTH ERROR: ', JSON.stringify(error))
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        case 'OAuthAccountNotLinked':
          return {
            error:
              'Another account already exists with the same e-mail address!'
          }
        case 'AccountNotLinked':
          return {
            error:
              'Another account already exists with the same e-mail address!'
          }
        case 'CallbackRouteError':
          return { error: 'Callback route error!' }

        default:
          return { error: 'An error occurred!' }
      }
    }
    throw error
  }
}

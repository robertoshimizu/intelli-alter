import log from '@/lib/utils/logging-service'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { db } from '@/lib/db'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  debug: false,
  providers: [
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)

          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) {
            return user
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  logger: {
    error(code, ...message) {
      log.error(code, ...message)
    },
    warn(code, ...message) {
      log.warn(code, ...message)
    },
    debug(code, ...message) {
      log.debug(code, ...message)
    }
  }
})

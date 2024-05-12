import log from '@/lib/utils/logging-service'
import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './schemas'
import { getUserByEmail, getUserById } from './data/user'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address?: string
      /** customField */
      customField?: string
      /** UserRole user or admin */
      role?: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  debug: true,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
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
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user?.id ?? '')
    //   // If I want to block users that did not verify their email
    //   if (!existingUser || !existingUser.emailVerified) return false
    //   return true
    // },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      token.customField = 'customField value'

      return token
    },
    session({ session, token }) {
      console.log({
        sessionToken: token,
        session
      })

      if (token.sub && session.user) {
        session.user.id = token.sub as string
        session.user.customField = token.customField as string // Add missing property 'customField' and cast it to string
      }

      if (token.role && session.user) {
        session.user.role = token.role as string
      }

      return session
    }
  },
  pages: {
    signIn: '/auth/login'
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

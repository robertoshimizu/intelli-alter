import NextAuth, { Session, User } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './schemas'
import { getUserByEmail, getUserById } from './data/user'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { getAccountByUserId } from './data/account'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  debug: false,
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
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
    async signIn({ user, account }) {
      // Allow OAuth withouth email verification
      if (account?.provider !== 'credentials') {
        return true
      }
      const existingUser = await getUserById(user?.id ?? '')
      // If I want to block users that did not verify their email
      if (!existingUser || !existingUser.emailVerified) return false

      // TODO: Add 2FA verification

      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = existingAccount?.provider ? true : false
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.customField = 'customField value'

      return token
    },
    session({ session, token }) {
      // console.log({
      //   sessionToken: token,
      //   session
      // })

      if (token.sub && session.user) {
        session.user.id = token.sub as string
        session.user.customField = token.customField as string // Add missing property 'customField' and cast it to string
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  // events
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date()
        }
      }) // update user
    },
    // session(message) {
    //   console.log('session EVENT', message)
    // },
    signIn(message) {
      console.log('signIn EVENT', message)
    },
    signOut(message) {
      console.log('signOut EVENT', message)
    }
  }
  // logger: {
  //   error(code, ...message) {
  //     log.error(code, ...message)
  //   },
  //   warn(code, ...message) {
  //     log.warn(code, ...message)
  //   },
  //   debug(code, ...message) {
  //     log.debug(code, ...message)
  //   }
  // },
})

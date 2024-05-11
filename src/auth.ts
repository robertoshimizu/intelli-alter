import log from '@/lib/utils/logging-service'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { db } from '@/lib/db'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  debug: false,
  providers: [GitHub],
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

import log from '@/lib/utils/logging-service'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: false,
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
  },
  providers: [GitHub],
  pages: {
    signIn: '/sign-in'
  }
})

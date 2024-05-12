import { auth } from '@/auth'
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT
} from '@/routes'

// By default I want all requests invoke middleware
// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  console.log('ROUTE: ', req.nextUrl.pathname)
  console.log('isLoggedIn: ', isLoggedIn)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Order matters here

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return null
})

// Optionally, don't invoke middleware for specific routes
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
// prisma is already running on Edge Runtime
export const runtime = 'experimental-edge'

import { auth } from '@/auth'

// By default I want all requests invoke middleware
export default auth((req) => {
  const isLoggedIn = !!req.auth
  console.log('ROUTE: ', req.nextUrl.pathname)
  console.log('isLoggedIn: ', isLoggedIn)
})

// Optionally, don't invoke middleware for specific routes
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
// prisma is already running on Edge Runtime
export const runtime = 'experimental-edge'

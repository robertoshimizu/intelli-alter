import { auth } from './auth'

// By default I want all requests invoke middleware
export default auth((req) => {
  console.log('ROUTE: ', req.url)
})

// Optionally, don't invoke middleware for specific routes
export const config = {
  matcher: '/api/rss_read'
}

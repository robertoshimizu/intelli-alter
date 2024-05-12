/**
 * An array of routes that are accessible by the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * An array of routes that are accessible by authenticated users.
 * @type {string[]}
 *
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * The prefix for API authentication routes.
 * @type {string}
 *
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in.
 * @type {string}
 *
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'

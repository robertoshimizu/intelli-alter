import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// This boiler plate is to circunvent Nextjs hot reload, to avoid reinitializing the prisma client on every hot reload

declare global {
  var prisma: PrismaClient | undefined
}

export const db = new PrismaClient().$extends(withAccelerate())

console.log('prisma client initialized... at: ', process.env.NODE_ENV)
// @ts-ignore
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

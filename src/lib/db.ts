import { PrismaClient } from '@prisma/client'

// This boiler plate is to circunvent Nextjs hot reload, to avoid reinitializing the prisma client on every hot reload

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

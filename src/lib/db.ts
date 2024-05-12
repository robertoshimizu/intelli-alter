import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

// This boiler plate is to circunvent Nextjs hot reload, to avoid reinitializing the prisma client on every hot reload
export const runtime = 'edge'
declare global {
  var prisma: PrismaClient | undefined
}

const neon = new Pool({ connectionString: process.env.DATABASE_URL })

const adapter = new PrismaNeon(neon)
// @ts-ignore
export const db = globalThis.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

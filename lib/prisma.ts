import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'

export const prisma = (() => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined')
  }

  const url = new URL(connectionString)

  const schema = url.searchParams.get('schema') || 'public'

  // REMOVE ?schema da URL para o Pool
  url.searchParams.delete('schema')

  const cleanUrl = url.toString()

  // Pool SEM schema
  const pool = new Pool({
    connectionString: cleanUrl,
    max: 5,
  })

  // Prisma recebe o schema
  const adapter = new PrismaPg(pool, { schema })

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'dev' ? ['query'] : [],
  })
})()

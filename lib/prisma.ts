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

  // Pool SEM ?schema (limpo)
  const pool = new Pool({
    connectionString: `${url.protocol}//${url.username}:${url.password}@${url.host}${url.pathname}`,
    max: process.env.NODE_ENV === 'test' ? 1 : undefined,
  })

  // Passa schema no PrismaPg options
  const adapter = new PrismaPg(pool, {
    schema,
  })

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'dev' ? ['query'] : [],
  })
})()

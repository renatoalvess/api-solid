import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'

export const prisma = (() => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined')
  }

  // Cria URL a partir da DATABASE_URL
  const url = new URL(connectionString)

  // Pega o schema (ou public)
  const schema = url.searchParams.get('schema') || 'public'

  // REMOVE ?schema da URL para o Pool
  url.searchParams.delete('schema')

  const cleanUrl = url.toString()

  // Pool SEM schema
  const pool = new Pool({
    connectionString: cleanUrl,
    max: 5, // ✅ seguro para testes e produção
  })

  // Prisma recebe o schema explicitamente
  const adapter = new PrismaPg(pool, { schema })

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'dev' ? ['query'] : [],
  })
})()

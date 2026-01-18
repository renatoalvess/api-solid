import 'dotenv/config'
import { prisma } from 'lib/prisma'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

function generatedDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr' as const,
  async setup() {
    const schema = randomUUID()
    const databaseUrl = generatedDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    console.log(databaseUrl)

    execSync('npx prisma migrate deploy', {
      stdio: 'ignore',
    })

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}

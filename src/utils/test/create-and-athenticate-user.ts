import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import { prisma } from 'lib/prisma'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  const user = await prisma.user.create({
    data: {
      name: 'Renato Alves',
      email: 'renato@gmail.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'renato@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}

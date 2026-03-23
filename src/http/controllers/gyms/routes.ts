import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createGymBodySchema, createGymResponseSchema, nearbyGymsQuerySchema, nearbyGymsResponseSchema, searchGymsQuerySchema, searchGymsResponseSchema } from '@/http/schemas'
import z from 'zod'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  const route = app.withTypeProvider<ZodTypeProvider>()
  route.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        summary: 'Cria uma nova academia',
        tags: ['Gyms'],
        security: [{ bearerAuth: [] }],
        body: createGymBodySchema,
        response: {
          201: createGymResponseSchema,
          403: z.object({ message: z.string() }),
        },
      },
    },
    create,
  )

  route.get(
    '/gyms/nearby',
    {
      schema: {
        summary: 'Busca academias próximas',
        tags: ['Gyms'],
        security: [{ bearerAuth: [] }],
        querystring: nearbyGymsQuerySchema,
        response: {
          200: nearbyGymsResponseSchema,
        },
      },
    },
    nearby,
  )
  route.get(
    '/gyms/search',
    {
      schema: {
        summary: 'Busca academias por nome',
        tags: ['Gyms'],
        security: [{ bearerAuth: [] }],
        querystring: searchGymsQuerySchema,
        response: {
          200: searchGymsResponseSchema,
        },
      },
    },
    search,
  )
}

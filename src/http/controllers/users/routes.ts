import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'
import z from 'zod'
import {
  registerBodySchema,
  authenticateBodySchema,
  authenticateResponseSchema,
} from '@/http/schemas'
import {
  profileErrorSchema,
  profileResponseSchema,
} from '@/http/schemas/profile'

const errorSchema = z.object({
  message: z.string(),
})

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Cria um novo usuário',
        tags: ['Users'],
        body: registerBodySchema,
        response: {
          201: z.object({}),
          409: errorSchema,
        },
      },
    },
    register,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        summary: 'Autenticação de usuário',
        description:
          'Realiza login e retorna JWT token. Refresh token é salvo em cookie httpOnly.',
        tags: ['Authentication'],
        body: authenticateBodySchema,
        response: {
          200: authenticateResponseSchema,
          400: errorSchema,
        },
      },
    },
    authenticate,
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/token/refresh',
    {
      schema: {
        summary: 'Refresh do token de acesso',
        description: `
          Gera um novo access token usando o refresh token armazenado em cookie.
          O refresh token deve ser enviado automaticamente pelo navegador via cookie httpOnly.
        `,
        tags: ['Authentication'],
        response: {
          200: authenticateResponseSchema,
          401: errorSchema,
        },
      },
    },
    refresh,
  )

  /** Autenticated routes */
  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      onRequest: [verifyJWT],
      schema: {
        summary: 'Perfil do usuário autenticado',
        description:
          'Retorna os dados do usuário logado. Requer token JWT válido no header Authorization.',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        response: {
          200: profileResponseSchema,
          401: profileErrorSchema,
        },
      },
    },
    profile,
  )
}

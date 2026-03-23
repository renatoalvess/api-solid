import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  checkInErrorSchema,
  checkInHistoryQuerySchema,
  checkInHistoryResponseSchema,
  checkInMetricsResponseSchema,
  checkInParamsSchema,
  createCheckInBodySchema,
  createCheckInResponseSchema,
  validateCheckInParamsSchema,
  validateCheckInResponseSchema,
} from '@/http/schemas/check-ins'
import z from 'zod'

export async function CheckInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  const route = app.withTypeProvider<ZodTypeProvider>()

  route.get(
    '/check-ins/history',
    {
      schema: {
        summary: 'Histórico de check-ins do usuário',
        description:
          'Retorna todos os check-ins realizados pelo usuário logado.',
        tags: ['Check-ins'],
        security: [{ bearerAuth: [] }],
        querystring: checkInHistoryQuerySchema,
        response: {
          200: checkInHistoryResponseSchema,
        },
      },
    },
    history,
  )

  route.get(
    '/check-ins/metrics',
    {
      schema: {
        summary: 'Métricas de check-ins',
        description:
          'Retorna a quantidade total de check-ins do usuário logado.',
        tags: ['Check-ins'],
        security: [{ bearerAuth: [] }],
        response: {
          200: checkInMetricsResponseSchema,
        },
      },
    },
    metrics,
  )

  route.post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        summary: 'Realizar check-in',
        description:
          'Realiza um check-in em uma academia. O usuário deve estar a menos de 100m da academia.',
        tags: ['Check-ins'],
        security: [{ bearerAuth: [] }],
        params: checkInParamsSchema,
        body: createCheckInBodySchema,
        response: {
          201: createCheckInResponseSchema,
          400: checkInErrorSchema,
          404: checkInErrorSchema,
        },
      },
    },
    create,
  )

  route.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        summary: 'Validar check-in',
        description: 'Valida um check-in pendente. Requer papel de ADMIN.',
        tags: ['Check-ins'],
        security: [{ bearerAuth: [] }],
        params: validateCheckInParamsSchema,
        response: {
          200: validateCheckInResponseSchema,
          400: checkInErrorSchema,
          404: checkInErrorSchema,
          403: z.object({ message: z.string() }),
        },
      },
    },
    validate,
  )
}

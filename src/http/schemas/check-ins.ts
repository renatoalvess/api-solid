import z from 'zod'

// Params
export const checkInParamsSchema = z.object({
  gymId: z.string().uuid().describe('ID da academia'),
})

export const validateCheckInParamsSchema = z.object({
  checkInId: z.string().uuid().describe('ID do check-in'),
})

// Body
export const createCheckInBodySchema = z.object({
  latitude: z
    .number()
    .refine((value) => Math.abs(value) <= 90, {
      message: 'Latitude deve estar entre -90 e 90',
    })
    .describe('Latitude do usuário no momento do check-in'),
  longitude: z
    .number()
    .refine((value) => Math.abs(value) <= 180, {
      message: 'Longitude deve estar entre -180 e 180',
    })
    .describe('Longitude do usuário no momento do check-in'),
})

// Query
export const checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1).describe('Página da listagem'),
})

// Responses
export const createCheckInResponseSchema = z
  .object({})
  .describe('Check-in criado com sucesso')

export const checkInHistoryResponseSchema = z.object({
  checkIns: z.array(
    z.object({
      id: z.string().uuid(),
      created_at: z.date(),
      validated_at: z.date().nullable(),
      user_id: z.string().uuid(),
      gym_id: z.string().uuid(),
    }),
  ),
})

export const checkInMetricsResponseSchema = z.object({
  checkInsCount: z.number(),
})

export const validateCheckInResponseSchema = z
  .object({})
  .describe('Check-in validado com sucesso')

export const checkInErrorSchema = z.object({
  message: z.string(),
})

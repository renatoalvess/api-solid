import { z } from 'zod'

export const profileResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'MEMBER']),
    created_at: z.date().or(z.string()), // depende de como vem do banco
  }),
})

export const profileErrorSchema = z.object({
  message: z.string(),
})
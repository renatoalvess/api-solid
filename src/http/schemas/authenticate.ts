import { z } from 'zod'

export const authenticateBodySchema = z.object({
  email: z.string().email().describe('Email do usuário'),
  password: z.string().min(6).describe('Senha do usuário'),
})

export const authenticateResponseSchema = z.object({
  token: z.string().describe('JWT access token'),
})

export const refreshTokenResponseSchema = z.object({
  token: z.string(),
})
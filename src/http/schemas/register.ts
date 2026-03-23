import z from 'zod'

export const registerBodySchema = z.object({
  name: z.string().describe('Nome do usuário'),
  email: z.string().email().describe('Email do usuário'),
  password: z.string().min(6).describe('Senha com no mínimo 6 caracteres'),
})
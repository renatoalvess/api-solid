import { z } from 'zod'

export const createGymBodySchema = z.object({
  title: z.string().describe('Nome da academia'),
  description: z.string().nullable().describe('Descrição da academia'),
  phone: z.string().nullable().describe('Telefone de contato'),
  latitude: z.number().refine((value) => Math.abs(value) <= 90, {
    message: 'Latitude deve estar entre -90 e 90',
  }).describe('Latitude da localização'),
  longitude: z.number().refine((value) => Math.abs(value) <= 180, {
    message: 'Longitude deve estar entre -180 e 180',
  }).describe('Longitude da localização'),
})

export const createGymResponseSchema = z.object({}).describe('Academia criada com sucesso')

export const gymErrorSchema = z.object({
  message: z.string(),
})


export const nearbyGymsQuerySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

export const nearbyGymsResponseSchema = z.object({
  gyms: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
  })),
})

export const searchGymsQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().default(1),
})

export const searchGymsResponseSchema = nearbyGymsResponseSchema
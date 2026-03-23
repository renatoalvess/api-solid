import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { checkInParamsSchema, createCheckInBodySchema } from '@/http/schemas'

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const { gymId } = checkInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(201).send()
}

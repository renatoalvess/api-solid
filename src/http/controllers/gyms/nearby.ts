import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { nearbyGymsQuerySchema } from '@/http/schemas'
import { normalizeGym } from '@/http/utils/normalize-gym'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  const normalizedGyms = gyms.map(normalizeGym)

  return reply.status(200).send({
    gyms: normalizedGyms,
  })
}

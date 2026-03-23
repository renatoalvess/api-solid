import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { searchGymsQuerySchema } from '@/http/schemas'
import { normalizeGym } from '@/http/utils/normalize-gym'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  const normalizedGyms = gyms.map(normalizeGym)

  return reply.status(200).send({
    gyms: normalizedGyms,
  })
}

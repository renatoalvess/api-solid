import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQueryShema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { query, page } = searchGymsQueryShema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })
  return reply.status(200).send({
    gyms,
  })
}

import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { checkInHistoryQuerySchema } from '@/http/schemas/check-ins'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  })
  return reply.status(200).send({
    checkIns,
  })
}

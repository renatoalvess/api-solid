import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { validateCheckInParamsSchema } from '@/http/schemas/check-ins'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })
  return reply.status(204).send()
}

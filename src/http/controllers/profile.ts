import type { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(
  request: FastifyRequest,
  reply: FastifyReply,
) {

//   try {
//     const authenticateUseCase = makeAuthenticateUseCase()

//     await authenticateUseCase.execute({
//       email,
//       password,
//     })
//   } catch (error) {
//     if (error instanceof InvalidCredentialsError) {
//       return reply.status(400).send({ message: error.message })
//     }

//     throw error
//   }

  return reply.status(200).send()
}

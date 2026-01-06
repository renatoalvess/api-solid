import type { CheckIn } from 'generated/prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserChechInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserChechInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserChechInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserChechInsHistoryUseCaseRequest): Promise<FetchUserChechInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}

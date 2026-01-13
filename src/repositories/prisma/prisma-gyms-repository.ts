import type { GymCreateInput } from 'generated/prisma/models'
import type { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from 'lib/prisma'
import type { Gym } from 'generated/prisma/client'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.gym.findMany()

    return gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: Number(gym.latitude),
          longitude: Number(gym.longitude),
        },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })
    return gyms
  }
  async create(data: GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }
}

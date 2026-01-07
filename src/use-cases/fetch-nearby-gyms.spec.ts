import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gysmRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    gysmRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gysmRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gysmRepository.create({
      title: 'Near Gym',
      description: 'The best gym in town',
      phone: 'null',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gysmRepository.create({
      title: 'For Gym',
      description: 'The best gym in town',
      phone: 'null',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

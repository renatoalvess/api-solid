import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gysmRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    gysmRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gysmRepository)
  })

  it('should be able to search for gyms', async () => {
    await gysmRepository.create({
      title: 'JavaScript Gym',
      description: 'The best gym in town',
      phone: 'null',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gysmRepository.create({
      title: 'TypeScript Gym',
      description: 'The best gym in town',
      phone: 'null',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gysmRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'The best gym in town',
        phone: 'null',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})

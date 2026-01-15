import type { User } from 'generated/prisma/client'
import type { UserCreateInput } from 'generated/prisma/models'
import type { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)
    if (!user) {
      return null
    }
    return user
  }
  async create(data: UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: data.role ?? 'MEMBER',
    }
    this.items.push(user)
    return user
  }
}

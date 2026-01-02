import type { Prisma, User } from 'generated/prisma/client'
import { prisma } from 'lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  findById(_id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  findByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = prisma.user.create({
      data,
    })
    return user
  }
}

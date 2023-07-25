import { PrismaClient } from '@prisma/client';
import { User } from 'src/domain/entities/User';
import { IUserRepository } from 'src/domain/repositories/IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }
  
  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.email,
        password_hash: "1234",
      },
    });
  }
  async find(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

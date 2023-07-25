import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IUnitOfWork } from 'src/application/interfaces/IUnitOfWork';
import { PrismaUserRepository } from '../persistence/prisma/repositories/PrismaCustomerRepository';

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  private originalPrisma: PrismaClient;
  private prisma: PrismaClient;
  constructor(prisma?: PrismaClient) {
    // TODO: deve ser um singleton
    this.originalPrisma =
      prisma ??
      new PrismaClient({
        log: ['query', 'info', 'warn'],
      });
    this.prisma = this.originalPrisma;
  }

  getRepository<T>(repository: string): T {
    return new PrismaUserRepository(this.prisma) as T;
  }

  async transactional<T>(work: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      this.prisma = tx as any;
      try {
        return work();
      } finally {
        this.prisma = this.originalPrisma;
      }
    });
  }
}

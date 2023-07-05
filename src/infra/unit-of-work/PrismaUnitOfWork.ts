import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../persistence/prisma/PrismaCustomerRepository';
import { IUnitOfWork } from 'src/application/interfaces/IUnitOfWork';


@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  private originalPrisma: PrismaClient;
  private prisma: PrismaClient;
  constructor() {
    // TODO: deve ser um singleton
    this.originalPrisma = new PrismaClient({
      log: ['query', 'info', 'warn'],
    });
    this.prisma = this.originalPrisma;
  }

  getRepository<T>(repository: string): T {
    return new PrismaCustomerRepository(this.prisma) as T;
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

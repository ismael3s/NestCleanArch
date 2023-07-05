import { PrismaClient } from '@prisma/client';
import { Customer } from 'src/domain/entities/customer';
import { ICustomerRepository } from 'src/domain/repositories/ICustomerRepository';

export class PrismaCustomerRepository implements ICustomerRepository {
  constructor(private prisma: PrismaClient) {}
  async create(customer: Customer): Promise<void> {
    await this.prisma.customer.create({
      data: {
        email: customer.email,
      },
    });
  }
  async find(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }
}

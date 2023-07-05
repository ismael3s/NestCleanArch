import { PrismaClient } from '@prisma/client';
import { ICustomerRepository } from 'src/domain/repositories/icustomer-repository';
import { Customer } from '../../nest/app.service';

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

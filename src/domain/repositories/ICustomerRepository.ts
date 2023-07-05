import { Customer } from '@prisma/client';

export interface ICustomerRepository {
  find(): Promise<Customer[]>;
  create(customer: Customer): Promise<void>;
}

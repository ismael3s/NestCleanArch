import { Customer } from "../entities/customer";

export interface ICustomerRepository {
  find(): Promise<Customer[]>;
  create(customer: Customer): Promise<void>;
}

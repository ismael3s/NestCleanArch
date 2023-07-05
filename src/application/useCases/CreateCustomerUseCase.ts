import { ICustomerRepository } from 'src/domain/repositories/icustomer-repository';
import { IUnitOfWork } from '../interfaces/IUnitOfWork';
import { Customer } from 'src/domain/entities/customer';

type Input = {
  email: string;
};
export class CreateCustomerUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}
  async execute(input: Input) {
    const customerRepository =
      this.unitOfWork.getRepository<ICustomerRepository>('CustomerRepository');
    const customer = new Customer(input.email, null);
    await customerRepository.create(customer);
    await customerRepository.create(
      new Customer('ismael.san123@aocubo.com', null),
    );
    throw new Error('error');
    return customer;
  }
}

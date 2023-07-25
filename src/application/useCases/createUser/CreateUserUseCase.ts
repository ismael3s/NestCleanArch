import { IUserRepository } from 'src/domain/repositories/IUserRepository';
import { IUnitOfWork } from '../../interfaces/IUnitOfWork';
import { User } from 'src/domain/entities/User';
import { CreateUserInputDto } from './CreateUserInputDto';

export class CreateUserUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  execute(input: CreateUserInputDto) {
    return this.unitOfWork.transactional(async () => {
      const userRepository =
        this.unitOfWork.getRepository<IUserRepository>('UserRepository');
      const customer = new User({
        email: input.email,
        name: input.name,
        password: input.password,
      });
      await userRepository.create(customer);
      return customer;
    });
  }
}

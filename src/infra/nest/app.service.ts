import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IUnitOfWork } from 'src/application/interfaces/IUnitOfWork';
import { CreateUserInputDto } from 'src/application/useCases/createUser/CreateUserInputDto';
import { CreateUserUseCase } from 'src/application/useCases/createUser/CreateUserUseCase';

@Injectable()
export class AppService {
  constructor(
    @Inject('UnitOfWork')
    private readonly unitOfWork: IUnitOfWork,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async post(input: CreateUserInputDto) {
    await this.unitOfWork.transactional(async () => {
      await this.createUserUseCase.execute({
        email: input.email,
        name: input.name,
        password: input.password,
      });
    });
  }
}

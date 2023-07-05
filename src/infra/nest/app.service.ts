import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCustomerUseCase } from 'src/application/useCases/CreateCustomerUseCase';
import { IUnitOfWork } from 'src/application/interfaces/IUnitOfWork';

@Injectable()
export class AppService {
  constructor(
    @Inject('UnitOfWork')
    private readonly unitOfWork: IUnitOfWork,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
  ) {}

  async post() {
    await this.unitOfWork.transactional(async () => {
      await this.createCustomerUseCase.execute({
        email: `ismael${randomUUID()}@aocubo.com`,
      });
    });
  }

}

export class Customer {
  id: number;
  email: string;
}

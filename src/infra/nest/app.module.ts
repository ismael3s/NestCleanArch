import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../persistence/prisma/prisma.module';
import {
  UnitOfWorkModule,
} from '../unit-of-work/unit-of-work.module';
import { PrismaUnitOfWork } from '../unit-of-work/PrismaUnitOfWork';
import { CreateCustomerUseCase } from 'src/application/useCases/CreateCustomerUseCase';
import { IUnitOfWork } from 'src/application/interfaces/IUnitOfWork';

@Module({
  imports: [PrismaModule, UnitOfWorkModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'UnitOfWork',
      useClass: PrismaUnitOfWork,
    },
    {
      provide: CreateCustomerUseCase,
      useFactory: (unitOfWork: IUnitOfWork) => {
        return new CreateCustomerUseCase(unitOfWork);
      },
      inject: ['UnitOfWork'],
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../persistence/prisma/prisma.module';
import {
  UnitOfWorkModule,
} from '../unit-of-work/unit-of-work.module';
import { PrismaUnitOfWork } from '../unit-of-work/PrismaUnitOfWork';
import { IUnitOfWork } from 'src/application/interfaces/IUnitOfWork';
import { CreateUserUseCase } from 'src/application/useCases/createUser/CreateUserUseCase';

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
      provide: CreateUserUseCase,
      useFactory: (unitOfWork: IUnitOfWork) => {
        return new CreateUserUseCase(unitOfWork);
      },
      inject: ['UnitOfWork'],
    },
  ],
})
export class AppModule {}

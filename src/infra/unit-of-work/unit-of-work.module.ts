import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/persistence/prisma/prisma.module';
import { PrismaUnitOfWork } from './PrismaUnitOfWork';

@Module({
  imports: [PrismaModule],
  providers: [PrismaUnitOfWork],
  exports: [PrismaUnitOfWork],
})
export class UnitOfWorkModule {}

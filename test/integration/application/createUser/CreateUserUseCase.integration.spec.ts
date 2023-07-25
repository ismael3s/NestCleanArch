import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateUserUseCase } from 'src/application/useCases/createUser/CreateUserUseCase';
import { PrismaUnitOfWork } from 'src/infra/unit-of-work/PrismaUnitOfWork';
import { PostgreSqlContainer } from 'testcontainers';
import { PrismaSingleton } from 'src/infra/persistence/prisma/PrismaSingleton';
describe('CreateUserUseCase - Integration', () => {
  it('Ao criar um usuário, deve ser gerado um hash da senha', async () => {
    const container = await new PostgreSqlContainer()
      .withDatabase(randomUUID())
      .start();

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: container.getConnectionUri(),
        },
      },
    });

    await container.stop();

    const uow = new PrismaUnitOfWork(prisma);

    const createUserUseCase = new CreateUserUseCase(uow);

    await createUserUseCase.execute({
      email: 'ismael.santana@aocubo.com',
      name: 'Ismael Santana',
      password: '1234',
    });

    // const user = await prisma.user.findFirst({
    //   where: {
    //     email: 'ismael.santana@aocubo.com',
    //   },
    // });

    // expect(user).toBeDefined();
  });
});

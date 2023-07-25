import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserInputDto } from 'src/application/useCases/createUser/CreateUserInputDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  signUp(
    @Body()
    input: CreateUserInputDto,
  ) {
    return this.appService.post(input);
  }
}

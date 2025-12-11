import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

import { User } from './entities/user.entity';
import type { CreateUserDto } from './schemas/create-user.schema';
import { createUserSchema } from './schemas/create-user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }
}

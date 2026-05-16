import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { User as AppUser } from '../common/decorators/user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type { GetUserDto } from '../common/schemas/get-user.schema';
import { User } from './entities/user.entity';
import type { CreateUserDto } from './schemas/create-user.schema';
import { createUserSchema } from './schemas/create-user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Get('me')
  getProfile(@AppUser() user: GetUserDto): GetUserDto {
    return user;
  }
}

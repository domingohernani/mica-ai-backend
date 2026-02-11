import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { User as UserEntity } from '../../user/entities/user.entity';
import { GetUserDto } from '../schemas/get-user.schema';

export const User: ReturnType<typeof createParamDecorator> =
  createParamDecorator((_: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    // Get the user at the req object
    const userReq: UserEntity = request['appUser'];

    // Ensure user properties are valid
    if (
      !userReq?._id ||
      !userReq.email ||
      !userReq.firstName ||
      !userReq.lastName
    )
      throw new BadRequestException('Invalid user object in request');

    // Create a user
    const user: GetUserDto = {
      _id: userReq['_id'].toString(),
      sub: userReq['sub'],
      email: userReq['email'],
      firstName: userReq['firstName'],
      lastName: userReq['lastName'],
      profileUrl: userReq['profileUrl'],
      isVerified: userReq['isVerified'],
      createdAt: userReq['createdAt'],
      updatedAt: userReq['updatedAt'],
    };

    return user;
  });

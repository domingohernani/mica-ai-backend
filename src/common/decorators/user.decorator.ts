import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User as UserEntity } from '../../user/entities/user.entity';
import type { User as UserType } from '../types/user.types';

export const User: ReturnType<typeof createParamDecorator> =
  createParamDecorator((_: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    // Get the user at the req object
    const userReq: UserEntity = request['appUser'];

    // Create a user
    const user: UserType = {
      id: userReq['sub'],
      email: userReq[`${process.env.AUTH0_AUDIENCE}/email`],
      name: userReq[`${process.env.AUTH0_AUDIENCE}/name`],
    };

    return user;
  });

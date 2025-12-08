import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { User as UserType } from '../types/user.types';

export const User: ReturnType<typeof createParamDecorator> =
  createParamDecorator((_: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    // Get the user at the req object
    const userReq: object = request['user'];

    // Create a user
    const user: UserType = {
      id: userReq['sub'],
      email: userReq[`${process.env.AUTH0_AUDIENCE}/email`],
      name: userReq[`${process.env.AUTH0_AUDIENCE}/name`],
    };

    // user.name = user[`${process.env.AUTH0_AUDIENCE}/name`];
    // user.email = user[`${process.env.AUTH0_AUDIENCE}/email`];

    return user;
  });

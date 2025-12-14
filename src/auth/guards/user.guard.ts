import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User as UserType } from '../../common/types/user.types';
import { User } from '../../user/entities/user.entity';
import { UserService } from './../../user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is public
    const isPublic: boolean = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    // Skip if the route is public
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    // Get the user at the req object
    const user: UserType = request['user'];

    if (!user) {
      throw new UnauthorizedException();
    }

    // Find the user using sub
    const appUser: User = await this.userService.findByAuth0Sub(user.id);
    request['appUser'] = appUser;
    return true;
  }
}

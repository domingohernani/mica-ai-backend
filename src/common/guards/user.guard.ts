import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import type { GetUserDto } from '../schemas/get-user.schema';

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
    const user: JwtPayload = request['user'];

    if (!user) {
      throw new UnauthorizedException(
        'Missing or invalid authentication token',
      );
    }

    // Find the user using sub
    const appUser: User = await this.userService.findByAuth0Sub(user.sub);

    // Validate user properties
    if (!appUser._id || !appUser.email || !appUser.userName)
      throw new NotFoundException(`User not found`);

    // Create a user DTO object
    const appUserDto: GetUserDto = {
      _id: appUser._id?.toString(),
      email: appUser.email,
      userName: appUser.userName,
    };

    request['appUser'] = appUserDto;
    return true;
  }
}

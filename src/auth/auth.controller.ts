import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  @Public()
  @Post()
  signIn(@Body() token: string): string {
    return token;
  }
}

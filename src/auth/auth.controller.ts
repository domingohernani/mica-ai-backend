import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  signIn(@Body() token: string): string {
    console.log(token);
    return token;
  }
}

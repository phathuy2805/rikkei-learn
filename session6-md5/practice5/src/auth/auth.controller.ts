import { Controller, Post, Headers, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('username') username?: string) {
    return this.authService.login(username);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Headers('authorization') authHeader?: string, @Body('token') bodyToken?: string) {
    let token = bodyToken;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    return this.authService.logout(token);
  }
}

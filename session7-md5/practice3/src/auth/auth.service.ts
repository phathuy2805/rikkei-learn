import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string = 'testuser') {
    const payload = {
      sub: 1,
      username,
      email: 'testuser@example.com',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

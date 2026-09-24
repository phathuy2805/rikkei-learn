import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = {
      id: 108,
      username: loginDto.username || 'john_doe',
      email: 'john.doe@company.com',
      departmentId: 12,
      avatarUrl: 'https://cdn.company.com/avatars/user_108.png',
    };

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      departmentId: user.departmentId,
      avatarUrl: user.avatarUrl,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

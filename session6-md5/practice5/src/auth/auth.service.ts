import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async login(username: string = 'hacker_target_user') {
    const payload = { sub: 101, username, role: 'USER' };
    return {
      message: 'Đăng nhập thành công, cấp Access Token',
      accessToken: this.jwtService.sign(payload),
    };
  }

  logout(token: string) {
    if (!token) {
      throw new BadRequestException('Không tìm thấy token để đăng xuất');
    }
    this.blacklistService.add(token);
    return {
      message: 'Đăng xuất thành công, token đã được đưa vào Blacklist',
      status: 'BLACKLISTED',
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface UserEntity {
  id: number;
  username: string;
  email: string;
  hashedRefreshToken: string | null;
}

@Injectable()
export class AuthService {
  private users: UserEntity[] = [
    {
      id: 1,
      username: 'alex_developer',
      email: 'alex@company.com',
      hashedRefreshToken: null,
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  private async generateTokens(user: UserEntity) {
    const payload = { sub: user.id, username: user.username, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'JWT_ACCESS_SECRET_2026',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'JWT_REFRESH_SECRET_2026',
        expiresIn: '7d',
      }),
    ]);

    user.hashedRefreshToken = await argon2.hash(refreshToken);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 900,
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find((u) => u.username === (loginDto.username || 'alex_developer'));
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    const tokens = await this.generateTokens(user);

    return {
      message: 'Đăng nhập thành công, cấp Access Token & Refresh Token',
      ...tokens,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: 'JWT_REFRESH_SECRET_2026',
      });
    } catch {
      throw new UnauthorizedException('Refresh Token không hợp lệ hoặc đã hết hạn');
    }

    const user = this.users.find((u) => u.id === payload.sub);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Không tìm thấy phiên đăng nhập');
    }

    const isMatch = await argon2.verify(user.hashedRefreshToken, refreshToken);
    if (!isMatch) {
      user.hashedRefreshToken = null;
      throw new UnauthorizedException('Refresh Token đã được sử dụng hoặc bị thu hồi (Rotation Violation)');
    }

    const newTokens = await this.generateTokens(user);

    return {
      message: 'Làm mới token thành công (Refresh Token Rotation áp dụng)',
      ...newTokens,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

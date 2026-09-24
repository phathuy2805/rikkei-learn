import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

interface UserEntity {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

@Injectable()
export class AuthService {
  private users: UserEntity[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const existing = this.users.find((u) => u.username === registerDto.username);
    if (existing) {
      throw new BadRequestException('Tên người dùng đã tồn tại');
    }

    const passwordHash = await argon2.hash(registerDto.password);

    const newUser: UserEntity = {
      id: this.users.length + 1,
      username: registerDto.username,
      email: registerDto.email,
      passwordHash,
    };

    this.users.push(newUser);

    return {
      message: 'Đăng ký tài khoản thành công với mật khẩu đã mã hóa bằng Argon2',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        passwordHash: newUser.passwordHash,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find((u) => u.username === loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      message: 'Đăng nhập thành công, xác thực mật khẩu Argon2 hợp lệ',
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

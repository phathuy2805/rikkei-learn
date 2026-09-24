import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return {
      success: true,
      message: 'Đăng ký tài khoản thành công',
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
      },
    };
  }
}

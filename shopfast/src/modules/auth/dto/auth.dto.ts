import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length, Matches, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'customer@shopfast.vn' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(160)
  email: string;

  @ApiProperty({ example: 'Customer@123' })
  @Length(6, 50, { message: 'Mật khẩu phải từ 6 đến 50 ký tự' })
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn Khách' })
  @IsNotEmpty({ message: 'Vui lòng nhập họ tên' })
  @MaxLength(120)
  fullName: string;

  @ApiProperty({ required: false, example: '0901234567' })
  @IsOptional()
  @Matches(/^0\d{9,10}$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'customer@shopfast.vn' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ example: 'Customer@123' })
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  password: string;
}

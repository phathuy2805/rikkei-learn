import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CheckoutDto {
  @ApiProperty({ example: 'Số 123 Đường Cầu Giấy, Hà Nội' })
  @IsNotEmpty({ message: 'Vui lòng nhập địa chỉ nhận hàng' })
  @IsString()
  shippingAddress: string;

  @ApiProperty({ example: '0912345678' })
  @Matches(/^0\d{9,10}$/, { message: 'Số điện thoại nhận hàng không hợp lệ' })
  recipientPhone: string;
}

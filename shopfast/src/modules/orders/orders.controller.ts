import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckoutDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Đặt hàng từ giỏ hàng' })
  checkout(@Request() req: any, @Body() dto: CheckoutDto) {
    return this.orders.checkout(req.user.id, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Lịch sử đơn hàng của tôi' })
  getMyOrders(@Request() req: any) {
    return this.orders.getMyOrders(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết đơn hàng' })
  getOrderById(@Request() req: any, @Param('id') id: string) {
    return this.orders.getOrderById(id, req.user.id);
  }
}

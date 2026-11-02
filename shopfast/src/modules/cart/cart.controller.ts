import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('api/cart')
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Xem giỏ hàng hiện tại' })
  getCart(@Request() req: any) {
    return this.cart.getCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ' })
  addItem(@Request() req: any, @Body() dto: AddToCartDto) {
    return this.cart.addItem(req.user.id, dto);
  }

  @Patch('items/:id')
  @ApiOperation({ summary: 'Cập nhật số lượng sản phẩm' })
  updateItem(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cart.updateItem(req.user.id, id, dto);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Xóa sản phẩm khỏi giỏ' })
  removeItem(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.cart.removeItem(req.user.id, id);
  }

  @Delete()
  @ApiOperation({ summary: 'Xóa toàn bộ giỏ hàng' })
  clearCart(@Request() req: any) {
    return this.cart.clearCart(req.user.id);
  }
}

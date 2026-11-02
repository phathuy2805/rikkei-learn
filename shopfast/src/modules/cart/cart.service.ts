import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../entities/cart-item.entity';
import { Product } from '../../entities/product.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getCart(userId: string) {
    const items = await this.cartRepo.find({
      where: { userId },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });

    const subtotal = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0,
    );
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      subtotal,
      totalItems,
    };
  }

  async addItem(userId: string, dto: AddToCartDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }

    let item = await this.cartRepo.findOne({
      where: { userId, productId: dto.productId },
    });

    const targetQuantity = (item?.quantity || 0) + dto.quantity;
    if (product.stock < targetQuantity) {
      throw new BadRequestException(
        `Số lượng trong kho không đủ (chỉ còn ${product.stock} sản phẩm)`,
      );
    }

    if (item) {
      item.quantity = targetQuantity;
      await this.cartRepo.save(item);
    } else {
      item = this.cartRepo.create({
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      });
      await this.cartRepo.save(item);
    }

    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: number, dto: UpdateCartItemDto) {
    const item = await this.cartRepo.findOne({
      where: { id: itemId, userId },
      relations: ['product'],
    });

    if (!item) {
      throw new NotFoundException('Mục giỏ hàng không tồn tại');
    }

    if (item.product.stock < dto.quantity) {
      throw new BadRequestException(
        `Số lượng trong kho không đủ (chỉ còn ${item.product.stock} sản phẩm)`,
      );
    }

    item.quantity = dto.quantity;
    await this.cartRepo.save(item);
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: number) {
    await this.cartRepo.delete({ id: itemId, userId });
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    await this.cartRepo.delete({ userId });
    return { success: true };
  }
}

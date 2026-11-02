import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartItem } from '../../entities/cart-item.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Order, OrderStatus } from '../../entities/order.entity';
import { Product } from '../../entities/product.entity';
import { CheckoutDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,
    private readonly dataSource: DataSource,
  ) {}

  async checkout(userId: string, dto: CheckoutDto): Promise<Order> {
    const cartItems = await this.cartRepo.find({
      where: { userId },
      relations: ['product'],
    });

    if (!cartItems.length) {
      throw new BadRequestException('Giỏ hàng đang trống, vui lòng chọn sản phẩm');
    }

    return this.dataSource.transaction(async (manager) => {
      let subtotal = 0;
      const orderItems: OrderItem[] = [];

      for (const item of cartItems) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId },
        });

        if (!product || product.stock < item.quantity) {
          throw new BadRequestException(
            `Sản phẩm "${item.product?.name || item.productId}" không đủ số lượng trong kho`,
          );
        }

        // Deduct stock
        product.stock -= item.quantity;
        await manager.save(Product, product);

        subtotal += product.price * item.quantity;

        const orderItem = manager.create(OrderItem, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        });
        orderItems.push(orderItem);
      }

      const shippingFee = subtotal >= 500000 ? 0 : 30000;
      const total = subtotal + shippingFee;
      const code = `SF-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

      const order = manager.create(Order, {
        code,
        userId,
        subtotal,
        shippingFee,
        total,
        shippingAddress: dto.shippingAddress,
        recipientPhone: dto.recipientPhone,
        status: OrderStatus.PAID,
        items: orderItems,
      });

      const savedOrder = await manager.save(Order, order);

      // Clear user's cart
      await manager.delete(CartItem, { userId });

      return savedOrder;
    });
  }

  async getMyOrders(userId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(id: string, userId: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Đơn hàng #${id} không tồn tại`);
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền xem đơn hàng này');
    }

    return order;
  }
}

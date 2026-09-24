import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from '../dto/create-order.input';
import { Order } from '../models/order.model';

@Resolver(() => Order)
export class OrdersResolver {
  private orders: Order[] = [];

  @Query(() => [Order], { name: 'orders' })
  getOrders(): Order[] {
    return this.orders;
  }

  @Mutation(() => Order, { name: 'createOrder' })
  createOrder(@Args('input') input: CreateOrderInput): Order {
    const totalAmount = input.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const newOrder: Order = {
      id: '1001',
      customerName: input.customerName,
      totalAmount: Number(totalAmount.toFixed(2)),
      items: input.items,
      createdAt: new Date().toISOString(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }
}

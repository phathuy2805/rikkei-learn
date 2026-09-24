import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OrderItem } from './order-item.model';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  customerName: string;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field()
  createdAt: string;
}

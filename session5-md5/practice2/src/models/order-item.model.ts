import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}

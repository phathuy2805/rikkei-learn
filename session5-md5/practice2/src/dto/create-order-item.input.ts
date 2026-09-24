import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}

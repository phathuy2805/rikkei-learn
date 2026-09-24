import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  createdAt: string;
}

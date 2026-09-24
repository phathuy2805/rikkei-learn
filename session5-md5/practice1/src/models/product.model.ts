import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ProductStatus } from '../enums/product-status.enum';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => ProductStatus)
  status: ProductStatus;
}

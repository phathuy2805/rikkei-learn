import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;
}

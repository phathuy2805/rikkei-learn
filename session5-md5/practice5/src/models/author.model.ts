import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}

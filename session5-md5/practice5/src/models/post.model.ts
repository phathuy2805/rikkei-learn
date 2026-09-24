import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from './author.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => Author, { nullable: true })
  author?: Author;
}

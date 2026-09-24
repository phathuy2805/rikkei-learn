import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EmailScalar } from '../scalars/email.scalar';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => EmailScalar)
  email: string;
}

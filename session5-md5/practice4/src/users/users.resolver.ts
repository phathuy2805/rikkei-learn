import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { EmailScalar } from '../scalars/email.scalar';

@Resolver(() => User)
export class UsersResolver {
  private users: User[] = [
    { id: 1, name: 'Nguyen Van A', email: 'nguyenvana@rikkeiedu.com' },
  ];

  @Query(() => [User], { name: 'users' })
  getUsers(): User[] {
    return this.users;
  }

  @Mutation(() => User, { name: 'registerUser' })
  registerUser(
    @Args('name') name: string,
    @Args('email', { type: () => EmailScalar }) email: string,
  ): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }
}

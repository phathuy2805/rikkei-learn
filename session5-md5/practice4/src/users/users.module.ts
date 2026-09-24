import { Module } from '@nestjs/common';
import { EmailScalar } from '../scalars/email.scalar';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, EmailScalar],
})
export class UsersModule {}

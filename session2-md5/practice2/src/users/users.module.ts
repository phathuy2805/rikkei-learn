import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [CoreModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

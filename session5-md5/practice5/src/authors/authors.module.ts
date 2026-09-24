import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Module({
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}

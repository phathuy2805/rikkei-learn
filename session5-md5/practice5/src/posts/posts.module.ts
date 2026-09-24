import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [AuthorsModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}

import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../models/post.model';

@Injectable()
export class PostsService {
  private readonly logger = new Logger('Database');

  async findAll(): Promise<Post[]> {
    this.logger.log(`[QUERY 1] SELECT * FROM posts LIMIT 100;`);
    const posts: Post[] = [];
    for (let i = 1; i <= 100; i++) {
      posts.push({
        id: i,
        title: `Bài viết số ${i} về Công nghệ và Đời sống`,
        authorId: ((i - 1) % 5) + 1,
      });
    }
    return posts;
  }
}

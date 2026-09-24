import { Resolver, Query, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Post } from '../models/post.model';
import { Author } from '../models/author.model';
import { PostsService } from './posts.service';
import { AuthorLoader } from '../loaders/author.loader';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'posts' })
  async getPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @ResolveField(() => Author, { nullable: true })
  async author(
    @Parent() post: Post,
    @Context('authorLoader') authorLoader: AuthorLoader,
  ): Promise<Author | null> {
    return authorLoader.load(post.authorId);
  }
}

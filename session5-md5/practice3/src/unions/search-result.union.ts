import { createUnionType } from '@nestjs/graphql';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () => [User, Post] as const,
  resolveType(value) {
    if ('email' in value) {
      return User;
    }
    if ('title' in value) {
      return Post;
    }
    return null;
  },
});

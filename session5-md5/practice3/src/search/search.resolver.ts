import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchResultUnion } from '../unions/search-result.union';

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResultUnion], {
    name: 'search',
    description: 'Tìm kiếm đa hình trả về cả User và Post',
  })
  search(@Args('query', { defaultValue: '' }) query: string): Array<typeof SearchResultUnion> {
    const user = {
      id: 1,
      name: 'Nguyen Van A',
      email: 'nguyenvana@rikkeiedu.com',
    };

    const post = {
      id: 101,
      title: 'GraphQL Union Types in NestJS',
      content: 'Hướng dẫn sử dụng createUnionType và GraphQL Fragments',
    };

    return [user, post];
  }
}

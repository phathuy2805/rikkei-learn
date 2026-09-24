import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { AuthorsService } from './authors/authors.service';
import { createAuthorLoader } from './loaders/author.loader';

@Module({
  imports: [
    AuthorsModule,
    PostsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthorsModule],
      inject: [AuthorsService],
      useFactory: (authorsService: AuthorsService) => ({
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        playground: true,
        context: () => ({
          authorLoader: createAuthorLoader(authorsService),
        }),
      }),
    }),
  ],
})
export class AppModule {}

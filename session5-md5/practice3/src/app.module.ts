import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'session5-md5/practice3/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    SearchModule,
  ],
})
export class AppModule {}

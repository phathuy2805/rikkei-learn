import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
  providers: [
    ProductsService,
    ProductsResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [ProductsService, 'PUB_SUB'],
})
export class ProductsModule {}

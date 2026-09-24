import { Resolver, Query, Mutation, Subscription, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Product } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.input';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Product], { name: 'products' })
  getProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    const product = this.productsService.create(input);
    await this.pubSub.publish('productCreated', { productCreated: product });
    return product;
  }

  @Subscription(() => Product, {
    name: 'productCreated',
  })
  productCreated() {
    return this.pubSub.asyncIterator('productCreated');
  }
}

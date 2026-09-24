import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProductStatus } from '../enums/product-status.enum';
import { Product } from '../models/product.model';

@Resolver(() => Product)
export class ProductsResolver {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro M3',
      price: 1999.99,
      status: ProductStatus.IN_STOCK,
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 999.99,
      status: ProductStatus.OUT_OF_STOCK,
    },
    {
      id: 3,
      name: 'iPod Classic',
      price: 299.99,
      status: ProductStatus.DISCONTINUED,
    },
  ];

  @Query(() => [Product], { name: 'products', description: 'Lấy danh sách toàn bộ sản phẩm' })
  getProducts(): Product[] {
    return this.products;
  }

  @Query(() => Product, { name: 'product', description: 'Lấy thông tin sản phẩm theo ID' })
  getProduct(@Args('id', { type: () => Int }) id: number): Product {
    return this.products.find((p) => p.id === id);
  }
}

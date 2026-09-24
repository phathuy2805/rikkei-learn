import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.input';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'MacBook Pro M3 Max', price: 3499.99, createdAt: new Date().toISOString() },
    { id: 2, name: 'Dell XPS 16 OLED', price: 2899.99, createdAt: new Date().toISOString() },
  ];

  findAll(): Product[] {
    return this.products;
  }

  create(input: CreateProductInput): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: input.name,
      price: input.price,
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }
}

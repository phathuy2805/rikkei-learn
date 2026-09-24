import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module.js';
import { ProductsService } from './products.service.js';

@Module({
  imports: [CoreModule],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

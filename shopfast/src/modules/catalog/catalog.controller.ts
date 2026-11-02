import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/jwt-auth.guard';
import { CatalogService } from './catalog.service';

@ApiTags('Catalog')
@Public()
@Controller('api')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('categories')
  @ApiOperation({ summary: 'Lấy danh sách các danh mục' })
  getCategories() {
    return this.catalog.getCategories();
  }

  @Get('products')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm với bộ lọc danh mục, giá, tìm kiếm, sắp xếp' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: ['price_asc', 'price_desc', 'rating', 'newest'] })
  getProducts(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest',
  ) {
    return this.catalog.getProducts({
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      search,
      minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      sort,
    });
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Chi tiết sản phẩm theo ID' })
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.catalog.getProductById(id);
  }
}

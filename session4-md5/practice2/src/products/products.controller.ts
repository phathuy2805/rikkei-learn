import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Controller('products')
export class ProductsController {
  @Get()
  findAll(@Query() query: PaginationDto) {
    console.log('=== LOG KIEM TRA PHAN TRANG & SAP XEP ===');
    console.log('Query received:', query);
    console.log('typeof query.page:', typeof query.page, '-> value:', query.page);
    console.log('typeof query.limit:', typeof query.limit, '-> value:', query.limit);
    console.log('typeof query.sortBy:', typeof query.sortBy, '-> value:', query.sortBy);
    console.log('typeof query.sortOrder:', typeof query.sortOrder, '-> value:', query.sortOrder);
    console.log('========================================');

    return {
      success: true,
      pagination: {
        page: query.page,
        limit: query.limit,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        isPageNumber: typeof query.page === 'number',
        isLimitNumber: typeof query.limit === 'number',
      },
      data: [
        { id: 1, name: 'MacBook Pro M3', price: 2000 },
        { id: 2, name: 'iPhone 16 Pro Max', price: 1500 },
      ],
    };
  }
}

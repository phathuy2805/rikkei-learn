import { Controller, Get, UseGuards } from '@nestjs/common';
import { RateLimitGuard } from './guards/rate-limit.guard';

@Controller('api')
export class AppController {
  @Get('data')
  @UseGuards(RateLimitGuard)
  getData() {
    return {
      success: true,
      message: 'Lấy dữ liệu thành công',
      data: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
      ],
    };
  }
}

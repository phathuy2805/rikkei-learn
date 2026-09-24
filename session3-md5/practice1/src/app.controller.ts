import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('data')
  getData() {
    return {
      success: true,
      data: 'Sensitive API Data accessed successfully',
    };
  }
}

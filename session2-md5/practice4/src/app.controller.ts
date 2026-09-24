import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config/config.service.js';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('config')
  getConfig() {
    return {
      folder: this.configService.getFolder(),
      databaseUrl: this.configService.get('DATABASE_URL'),
    };
  }
}

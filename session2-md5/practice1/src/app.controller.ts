import { Controller, Get, Inject } from '@nestjs/common';
import { APP_CONFIG, AppConfig } from './config.constants.js';

@Controller()
export class AppController {
  constructor(
    @Inject(APP_CONFIG)
    private readonly config: AppConfig,
  ) {}

  @Get('info')
  getInfo(): AppConfig {
    return this.config;
  }
}

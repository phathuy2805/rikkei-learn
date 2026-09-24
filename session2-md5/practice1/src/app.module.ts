import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { APP_CONFIG, appConfig } from './config.constants.js';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
  ],
})
export class AppModule {}

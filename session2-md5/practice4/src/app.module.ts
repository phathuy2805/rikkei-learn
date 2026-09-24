import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ folder: './env-configs' }),
  ],
  controllers: [AppController],
})
export class AppModule {}

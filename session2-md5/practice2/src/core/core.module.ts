import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service.js';
import { DatabaseService } from './database.service.js';

@Module({
  providers: [LoggerService, DatabaseService],
  exports: [LoggerService, DatabaseService],
})
export class CoreModule {}

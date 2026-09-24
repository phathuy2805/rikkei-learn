import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../core/logger.service.js';
import { DatabaseService } from '../core/database.service.js';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
  ) {}

  onModuleInit() {
    this.logger.log('ProductsService initialized successfully via CoreModule re-export!');
    this.logger.log(this.database.query('SELECT * FROM products'));
  }

  getProducts(): string {
    return 'List of products';
  }
}

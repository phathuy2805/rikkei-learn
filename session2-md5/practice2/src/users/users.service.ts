import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../core/logger.service.js';
import { DatabaseService } from '../core/database.service.js';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
  ) {}

  onModuleInit() {
    this.logger.log('UsersService initialized successfully via CoreModule re-export!');
    this.logger.log(this.database.query('SELECT * FROM users'));
  }

  getUsers(): string {
    return 'List of users';
  }
}

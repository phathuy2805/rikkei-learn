import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../libs/database/src/database.service.js';

@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService) {}

  getHello(): string {
    return `[Main API] ${this.db.query('users')}`;
  }
}

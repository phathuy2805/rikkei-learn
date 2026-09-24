import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../libs/database/src/database.service.js';

@Injectable()
export class AdminService {
  constructor(private readonly db: DatabaseService) {}

  getDashboardStats(): string {
    return `[Admin Dashboard] ${this.db.query('audit_logs')}`;
  }
}

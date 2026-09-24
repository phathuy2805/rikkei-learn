import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  query(sql: string): string {
    return `Query executed: ${sql}`;
  }
}

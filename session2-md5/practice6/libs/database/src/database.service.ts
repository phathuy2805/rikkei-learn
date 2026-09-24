import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  connect(): string {
    return 'Shared Database Connection Pool established';
  }

  query(table: string): string {
    return `Query data from shared table: ${table}`;
  }
}

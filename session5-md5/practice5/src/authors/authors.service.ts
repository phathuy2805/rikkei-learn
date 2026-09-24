import { Injectable, Logger } from '@nestjs/common';
import { Author } from '../models/author.model';

@Injectable()
export class AuthorsService {
  private readonly logger = new Logger('Database');

  private authors: Author[] = [
    { id: 1, name: 'Nguyễn Nhật Ánh' },
    { id: 2, name: 'Tô Hoài' },
    { id: 3, name: 'Nam Cao' },
    { id: 4, name: 'Vũ Trọng Phụng' },
    { id: 5, name: 'Xuân Quỳnh' },
  ];

  async findByIds(authorIds: readonly number[]): Promise<(Author | null)[]> {
    this.logger.log(`[QUERY 2] SELECT * FROM authors WHERE id IN (${authorIds.join(', ')});`);
    const authorMap = new Map<number, Author>();
    this.authors.forEach((author) => authorMap.set(author.id, author));
    return authorIds.map((id) => authorMap.get(id) || null);
  }
}

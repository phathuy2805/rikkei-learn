import * as DataLoader from 'dataloader';
import { AuthorsService } from '../authors/authors.service';
import { Author } from '../models/author.model';

export type AuthorLoader = DataLoader<number, Author | null>;

export function createAuthorLoader(authorsService: AuthorsService): AuthorLoader {
  return new DataLoader<number, Author | null>(async (authorIds: readonly number[]) => {
    return authorsService.findByIds(authorIds);
  });
}

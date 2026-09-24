import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;

  @Exclude()
  password: string;

  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

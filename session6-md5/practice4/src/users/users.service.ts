import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [
    new UserEntity({
      id: 1,
      username: 'johndoe',
      email: 'john.doe@example.com',
      fullName: 'John Doe',
      role: 'ADMIN',
      password: '$argon2id$v=19$m=65536,p=4,t=3$secretHash123456789',
      createdAt: new Date('2026-01-15T08:30:00Z'),
    }),
    new UserEntity({
      id: 2,
      username: 'sarah_connor',
      email: 'sarah@example.com',
      fullName: 'Sarah Connor',
      role: 'USER',
      password: '$argon2id$v=19$m=65536,p=4,t=3$terminatorPasswordSecure999',
      createdAt: new Date('2026-02-20T10:15:00Z'),
    }),
  ];

  findAll(): UserEntity[] {
    return this.users.map((u) => new UserEntity(u));
  }

  findOne(id: number): UserEntity {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng có ID ${id}`);
    }
    return new UserEntity(user);
  }
}

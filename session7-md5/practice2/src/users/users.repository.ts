import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return null;
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      ...createUserDto,
      createdAt: new Date(),
    };
  }
}

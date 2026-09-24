import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  role: 'ADMIN' | 'USER';
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', age: 22, isActive: true, role: 'ADMIN' },
    { id: 2, name: 'Bob', age: 17, isActive: true, role: 'USER' },
    { id: 3, name: 'Charlie', age: 30, isActive: false, role: 'USER' },
  ];

  isEligibleForDiscount(age: number): boolean {
    if (age < 0) {
      throw new BadRequestException('Tuổi không hợp lệ');
    }
    return age >= 18 && age <= 60;
  }

  calculateRewardPoints(user: User): number {
    if (!user.isActive) {
      return 0;
    }
    let points = user.age * 10;
    if (user.role === 'ADMIN') {
      points += 100;
    }
    return points;
  }

  findById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng có ID ${id}`);
    }
    return user;
  }
}

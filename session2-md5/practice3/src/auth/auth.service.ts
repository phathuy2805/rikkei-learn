import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  validateUser(username: string, pass: string): boolean {
    const user = this.usersService.findByUsername(username);
    return user && user.password === pass;
  }

  generateToken(userId: number): string {
    return `jwt-token-for-user-${userId}`;
  }
}

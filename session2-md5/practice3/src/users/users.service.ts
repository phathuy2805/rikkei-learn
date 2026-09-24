import { Injectable, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class UsersService implements OnModuleInit {
  private users = [
    { id: 1, username: 'admin', password: 'password123' },
    { id: 2, username: 'john', password: 'secretpassword' },
  ];

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    console.log('[UsersService] Initialized with Circular Dependency resolved via forwardRef()!');
    const token = this.authService.generateToken(1);
    console.log(`[UsersService] Successfully generated token from AuthService: ${token}`);
  }

  findByUsername(username: string) {
    return this.users.find((u) => u.username === username);
  }

  login(username: string, pass: string) {
    const isValid = this.authService.validateUser(username, pass);
    if (!isValid) return { error: 'Invalid credentials' };
    const user = this.findByUsername(username);
    return { token: this.authService.generateToken(user.id) };
  }
}

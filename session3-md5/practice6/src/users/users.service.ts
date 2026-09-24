import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{ email: 'admin@rikkeiedu.com', name: 'Admin' }];

  register(dto: { email: string; name: string }) {
    const existing = this.users.find((u) => u.email === dto.email);
    if (existing) {
      const dbError = new Error('duplicate key value violates unique constraint "users_email_unique"');
      (dbError as any).code = '23505';
      (dbError as any).detail = `Key (email)=(${dto.email}) already exists.`;
      throw dbError;
    }
    this.users.push(dto);
    return { success: true, message: 'Đăng ký thành công', data: dto };
  }
}

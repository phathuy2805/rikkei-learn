import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class AppController {
  @Get()
  getUsers() {
    return [
      { id: 1, name: 'Nguyen Van A', role: 'admin' },
      { id: 2, name: 'Tran Thi B', role: 'user' },
    ];
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return {
      id: Number(id),
      name: 'Nguyen Van A',
      email: 'nguyenvana@rikkeiedu.com',
      balance: 5000000,
    };
  }
}

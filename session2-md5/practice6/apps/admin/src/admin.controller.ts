import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service.js';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getDashboardStats(): string {
    return this.adminService.getDashboardStats();
  }
}

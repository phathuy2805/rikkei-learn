import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Role, User } from '../entities/user.entity';
import { SEED_CATEGORIES, SEED_PRODUCTS } from './seed.data';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    try {
      // 1. Seed categories
      const catCount = await this.categoryRepo.count();
      if (catCount === 0) {
        this.logger.log('Seeding initial categories...');
        for (const cat of SEED_CATEGORIES) {
          await this.categoryRepo.save(this.categoryRepo.create(cat));
        }
      }

      // 2. Seed products
      const prodCount = await this.productRepo.count();
      if (prodCount === 0) {
        this.logger.log('Seeding initial demo products...');
        for (const prod of SEED_PRODUCTS) {
          await this.productRepo.save(this.productRepo.create(prod));
        }
      }

      // 3. Seed demo users
      const userCount = await this.userRepo.count();
      if (userCount === 0) {
        this.logger.log('Seeding demo accounts...');
        const customerHash = await bcrypt.hash('Customer@123', 10);
        const adminHash = await bcrypt.hash('Admin@123', 10);

        await this.userRepo.save([
          this.userRepo.create({
            email: 'customer@shopfast.vn',
            passwordHash: customerHash,
            fullName: 'Nguyễn Văn Khách',
            phone: '0901234567',
            role: Role.CUSTOMER,
          }),
          this.userRepo.create({
            email: 'admin@shopfast.vn',
            passwordHash: adminHash,
            fullName: 'Quản Trị Viên ShopFast',
            phone: '0988888888',
            role: Role.ADMIN,
          }),
        ]);
        this.logger.log('Demo accounts created: customer@shopfast.vn / Customer@123');
      }
    } catch (err: any) {
      this.logger.warn(`Seed execution notice: ${err.message}`);
    }
  }
}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './database/seed.service';
import { CartItem } from './entities/cart-item.entity';
import { Category } from './entities/category.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { CartModule } from './modules/cart/cart.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { HealthModule } from './modules/health/health.module';
import { OrdersModule } from './modules/orders/orders.module';

const isPostgres = process.env.DB_TYPE === 'postgres';

@Module({
  imports: [
    // Dual Database support (SQLite zero-config local / PostgreSQL for AWS production)
    TypeOrmModule.forRoot(
      isPostgres
        ? {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'shopfast',
            entities: [User, Category, Product, CartItem, Order, OrderItem],
            synchronize: true, // Auto-sync table schema for defense demo
            logging: false,
          }
        : {
            type: 'sqlite',
            database: process.env.DB_DATABASE || 'shopfast.sqlite',
            entities: [User, Category, Product, CartItem, Order, OrderItem],
            synchronize: true,
            logging: false,
          },
    ),

    TypeOrmModule.forFeature([User, Category, Product, CartItem, Order, OrderItem]),

    AuthModule,
    CatalogModule,
    CartModule,
    OrdersModule,
    HealthModule,
  ],
  providers: [
    SeedService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

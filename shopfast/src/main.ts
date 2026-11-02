import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({ origin: '*' });

  // Serve static files from public/ folder (Web UI)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('ShopFast E-commerce API')
    .setDescription(
      'API cho hệ thống ShopFast - Đăng ký, đăng nhập, danh mục sản phẩm, bộ lọc, giỏ hàng, đặt đơn và health check cho AWS deployment.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`====================================================`);
  logger.log(`🛍️  ShopFast E-Commerce Server is running!`);
  logger.log(`🌐 Web UI:        http://localhost:${port}/`);
  logger.log(`📑 Swagger Docs:  http://localhost:${port}/api/docs`);
  logger.log(`❤️  Health Check:  http://localhost:${port}/api/health`);
  logger.log(`====================================================`);
}

bootstrap();

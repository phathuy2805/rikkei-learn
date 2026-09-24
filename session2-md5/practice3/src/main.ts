import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  console.log('[NestApplication] Nest application successfully started with circular dependency resolved!');
}
bootstrap();

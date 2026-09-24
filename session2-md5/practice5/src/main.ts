import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const startTime = Date.now();
  console.log('[Bootstrap] Starting application initialization...');
  const app = await NestFactory.create(AppModule);
  await app.init();
  const duration = Date.now() - startTime;
  console.log(`[NestApplication] Nest application successfully started after ${duration}ms delay!`);
}
bootstrap();

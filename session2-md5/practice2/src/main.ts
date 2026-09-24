import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  console.log('AppModule successfully initialized with all CoreModule re-exported dependencies!');
  await app.close();
}
bootstrap();

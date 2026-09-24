import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  await app.listen(3001);
  console.log('Admin App running on http://localhost:3001');
}
bootstrap();

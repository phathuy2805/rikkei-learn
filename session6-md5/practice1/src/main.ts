import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3018);
  console.log('Server is running on http://localhost:3018');
}
bootstrap();

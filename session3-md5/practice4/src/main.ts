import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    req.user = { id: 1, role: 'user' };
    next();
  });
  await app.listen(3003);
}
bootstrap();

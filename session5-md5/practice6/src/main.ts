import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3017);
  console.log('GraphQL server with Subscriptions running on http://localhost:3017/graphql');
}
bootstrap();

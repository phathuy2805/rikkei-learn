import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { IpBlockMiddleware } from './middlewares/ip-block.middleware.js';

@Module({
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpBlockMiddleware).forRoutes('*');
  }
}

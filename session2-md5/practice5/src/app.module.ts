import { Module } from '@nestjs/common';
import { ASYNC_CONNECTION, createAsyncConnection } from './constants.js';

@Module({
  providers: [
    {
      provide: ASYNC_CONNECTION,
      useFactory: async () => {
        return await createAsyncConnection();
      },
    },
  ],
})
export class AppModule {}

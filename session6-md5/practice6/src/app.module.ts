import { Module } from '@nestjs/common';
import { CaslModule } from './casl/casl.module';
import { SalariesModule } from './salaries/salaries.module';

@Module({
  imports: [CaslModule, SalariesModule],
})
export class AppModule {}

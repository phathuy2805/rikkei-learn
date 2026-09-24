import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service.js';
import { CONFIG_OPTIONS } from './constants.js';
import { ConfigModuleOptions } from './interfaces/config-options.interface.js';

@Module({})
export class ConfigModule {
  static forRoot(options: { folder: string }): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}

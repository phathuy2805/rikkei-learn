import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants.js';
import { ConfigModuleOptions } from './interfaces/config-options.interface.js';

@Injectable()
export class ConfigService {
  private readonly configFolder: string;

  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: ConfigModuleOptions,
  ) {
    this.configFolder = options.folder;
  }

  getFolder(): string {
    return this.configFolder;
  }

  get(key: string): string {
    return `Loaded [${key}] from folder [${this.configFolder}]`;
  }
}

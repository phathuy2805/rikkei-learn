export const APP_CONFIG = 'APP_CONFIG';

export interface AppConfig {
  appName: string;
  version: string;
}

export const appConfig: AppConfig = {
  appName: 'MyNestApp',
  version: '1.0',
};

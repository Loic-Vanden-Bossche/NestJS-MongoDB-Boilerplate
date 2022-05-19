import { ConfigEnvironmentDto } from './config.environment.dto';

export enum Environment {
  DEV = 'dev',
  PREPROD = 'preprod',
  PROD = 'prod',
  TEST = 'test',
}

export const defaultConfig: ConfigEnvironmentDto = {
  AP_APP_PORT: 3001,
  AP_APP_ENV: Environment.DEV,
  AP_APP_VERBOSE: false,
  AP_APP_URLS_WHITELIST: ['http://localhost:4200'],
  AP_APP_FRONTEND_URL: 'http://localhost:4200',

  // Database
  AP_DB_HOST: 'localhost',
  AP_DB_NAME: 'exemple',
  AP_DB_USER: 'mongoose',
  AP_DB_PASSWORD: 'root',
  AP_DB_PORT: 27017,

  // JWT
  AP_JWT_SECRET: 'myverysecretkey',
  AP_JWT_EXPIRE_IN: '1-day',

  // RToken
  AP_RTOKEN_LENGTH: 32,
  AP_RTOKEN_EXPIRE_IN: '1-day',

  // Cookie
  AP_COOKIE_NAME: 'exemple-app',
  AP_COOKIE_EXPIRES_IN: '1-year',
  AP_COOKIE_SECURE: false,

  // Mail
  AP_MAILS_HOST: null,
  AP_MAILS_USER: null,
  AP_MAILS_PASSWORD: null,
  AP_MAILS_USER_TAG: 'Exemple App',

  // Admin
  AP_ADMIN_EMAIL: 'exemple-app.exemple@exemple.com',
  AP_ADMIN_PASSWORD: 'admin',
};

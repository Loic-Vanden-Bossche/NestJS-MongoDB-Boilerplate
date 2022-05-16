import { ConfigEnvironmentDto } from './config.environment.dto';
import { validateConfig } from '@boilerplate/config';
import {defaultConfig, Environment} from './config.default';



export interface BaseConfig {
  port: number;
  env: Environment;
  verbose: boolean;
  whitelistedOrigins: string[];
  frontendUrl: string;
}

export interface APIConfig extends BaseConfig {
  database: DatabaseConfig;
  jwt: JWTConfig;
  cookie: CookieConfig;
  rToken: RTokenConfig;
  mails: MailsConfig;
  admin: AdminConfig;
}

export interface CookieConfig {
  expiresIn: string;
  name: string;
  secure: boolean;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface RTokenConfig {
  expiresIn: string;
  length: number;
}

export interface MailsConfig {
  host: string;
  user: string;
  password: string;
  userTag: string;
}

export interface AdminConfig {
  email: string;
  password: string;
}

export const getConfig = (env: Record<string, unknown>): APIConfig => {
  const config = validateConfig(ConfigEnvironmentDto, defaultConfig, env);

  return {
    port: config.AP_APP_PORT,
    env: config.AP_APP_ENV,
    verbose: config.AP_APP_VERBOSE,
    whitelistedOrigins: config.AP_APP_URLS_WHITELIST,
    frontendUrl: config.AP_APP_FRONTEND_URL,
    database: {
      host: config.AP_DB_HOST,
      port: config.AP_DB_PORT,
      name: config.AP_DB_NAME,
      username: config.AP_DB_USER,
      password: config.AP_DB_PASSWORD,
    },
    jwt: {
      secret: config.AP_JWT_SECRET,
      expiresIn: config.AP_JWT_EXPIRE_IN,
    },
    cookie: {
      expiresIn: config.AP_COOKIE_EXPIRES_IN,
      name: config.AP_COOKIE_NAME,
      secure: config.AP_COOKIE_SECURE,
    },
    rToken: {
      expiresIn: config.AP_RTOKEN_EXPIRE_IN,
      length: config.AP_RTOKEN_LENGTH,
    },
    mails: {
      host: config.AP_MAILS_HOST,
      user: config.AP_MAILS_USER,
      password: config.AP_MAILS_PASSWORD,
      userTag: config.AP_MAILS_USER_TAG,
    },
    admin: {
      email: config.AP_ADMIN_EMAIL,
      password: config.AP_ADMIN_PASSWORD,
    },
  };
};

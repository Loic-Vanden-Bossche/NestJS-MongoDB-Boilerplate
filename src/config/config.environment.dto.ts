import {
  isBoolean,
  isEmail,
  isEnum,
  isNumber,
  isString,
} from 'class-validator';
import { Expose } from 'class-transformer';
import {
  isPortNumber,
  isUrlArray,
  isValidPeriod,
} from '@boilerplate/config/validators';
import { ConfigValidators, Validator } from '@boilerplate/config';
import {
  TransformArray,
  TransformBoolean,
  TransformNumber,
  UseDefault as BaseUseDefault,
  UseEnvPort,
} from '@boilerplate/config/transformers';
import { defaultConfig, Environment } from './config.default';
import { Desc, Secret } from '@boilerplate/config/decorators';

const UseDefault = () => BaseUseDefault(defaultConfig);

export class ConfigEnvironmentDto {
  //Base config
  @Validator(isPortNumber)
  @Expose()
  @UseDefault()
  @UseEnvPort()
  @TransformNumber()
  @Desc('Port to listen on')
  AP_APP_PORT: number;

  @Validator(isEnum, Environment)
  @Expose()
  @UseDefault()
  @Desc('Environment to run in')
  AP_APP_ENV: Environment;

  @Validator(isBoolean)
  @Expose()
  @UseDefault()
  @TransformBoolean()
  @Desc('Enable debug mode')
  AP_APP_VERBOSE: boolean;

  @Validator(isUrlArray)
  @Expose()
  @TransformArray()
  @UseDefault()
  @Desc('List of urls to proxy')
  AP_APP_URLS_WHITELIST: string[];

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Path of the frontend')
  AP_APP_FRONTEND_URL: string;

  // Database
  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Database host')
  @Secret()
  AP_DB_HOST: string;

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Database name')
  AP_DB_NAME: string;

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Database user')
  @Secret()
  AP_DB_USER: string;

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Database password')
  @Secret()
  AP_DB_PASSWORD: string;

  @Validator(isPortNumber)
  @Expose()
  @UseDefault()
  @TransformNumber()
  @Desc('Database port')
  AP_DB_PORT: number;

  // JWT
  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('JWT secret')
  @Secret()
  AP_JWT_SECRET: string;

  @ConfigValidators(isValidPeriod, isString)
  @Expose()
  @UseDefault()
  @Desc('JWT expiration time')
  AP_JWT_EXPIRE_IN: string;

  // RToken
  @Validator(isNumber)
  @Expose()
  @UseDefault()
  @TransformNumber()
  @Desc('RToken expiration time')
  AP_RTOKEN_LENGTH: number;

  @ConfigValidators(isValidPeriod, isString)
  @Expose()
  @UseDefault()
  @Desc('RToken expiration time')
  AP_RTOKEN_EXPIRE_IN: string;

  // Cookie
  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Cookie name')
  AP_COOKIE_NAME: string;

  @ConfigValidators(isValidPeriod, isString)
  @Expose()
  @UseDefault()
  @Desc('Cookie expiration time')
  AP_COOKIE_EXPIRES_IN: string;

  @Validator(isBoolean)
  @Expose()
  @TransformBoolean()
  @UseDefault()
  @Desc('Cookie secure')
  AP_COOKIE_SECURE: boolean;

  // Mails
  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Mail host')
  @Secret()
  AP_MAILS_HOST: string;

  @ConfigValidators(isEmail, isString)
  @Expose()
  @UseDefault()
  @Desc('Mail user')
  AP_MAILS_USER: string;

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Mail password')
  @Secret()
  AP_MAILS_PASSWORD: string;

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Mail user tag')
  AP_MAILS_USER_TAG: string;

  // Admin
  @Validator(isString)
  @Validator(isEmail)
  @Expose()
  @UseDefault()
  @Desc('Admin email')
  AP_ADMIN_EMAIL: string;

  @Validator(isString)
  @Expose()
  @UseDefault()
  @Desc('Admin password')
  @Secret()
  AP_ADMIN_PASSWORD: string;
}

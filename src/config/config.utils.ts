import * as path from 'path';
import { Environment } from './config.default';
import { DatabaseConfig } from './config';

export const databaseUseSSL = (env: Environment): boolean => {
  return env === Environment.PROD || env === Environment.PREPROD;
};

const envFiles = ['.env', '.db.env'];

export const getEnvFilesPaths = () => {
  const cwd = process.cwd();
  return [
    ...envFiles.map((file) => path.join(cwd, file)),
    ...envFiles.map((file) => path.join(cwd, '..', file)),
  ];
};

export const getSameSiteStrategy = (
  env: Environment,
): 'strict' | 'lax' | 'none' => {
  switch (env) {
    case Environment.PROD:
      return 'strict';
    case Environment.DEV:
      return 'lax';
    default:
      return 'none';
  }
};

export const getMongoString = (config: DatabaseConfig): string =>
  `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`;

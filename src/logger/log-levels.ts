import { Environment } from '../config/config.default';

export enum LogLevels {
  ERROR = 'error',
  WARN = 'warn',
  LOG = 'log',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

const productionLogLevels: LogLevels[] = [
  LogLevels.ERROR,
  LogLevels.WARN,
  LogLevels.LOG,
];

const devLogLevels: LogLevels[] = [
  LogLevels.ERROR,
  LogLevels.WARN,
  LogLevels.LOG,
  LogLevels.DEBUG,
];

const testLogLevels: LogLevels[] = [LogLevels.ERROR];

const envLogs = (env: Environment) => {
  switch (env) {
    case Environment.PROD || Environment.PREPROD:
      return productionLogLevels;
    case Environment.DEV:
      return devLogLevels;
    case Environment.TEST:
      return testLogLevels;
    default:
      return devLogLevels;
  }
};

export const getLogLevels = (env: Environment, verbose = false) =>
  envLogs(env).concat(verbose ? Object.values(LogLevels) : []);

import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import { LogsService } from './logs.service';
import { getLogLevels, LogLevels } from './log-levels';
import { BaseConfig } from '../config/config';

@Injectable()
class CustomLogger extends ConsoleLogger {
  private readonly logLevels: LogLevel[] = [];

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService<BaseConfig>,
    private readonly logsService: LogsService,
  ) {
    const logLevels: LogLevels[] = getLogLevels(
      configService.get('env'),
      configService.get('verbose'),
    );

    super(context, {
      ...options,
      logLevels,
    });

    this.logLevels = logLevels;
  }

  console(message: string, ...args: any[]): void {
    if (this.logLevels.includes(LogLevels.LOG)) {
      super.log.apply(this, [message]);
      console.log(...args);
    }
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);
  }

  error(message: string, stack?: string, context?: string) {
    super.error.apply(
      this,
      [message, stack, context].filter((f) => !!f),
    );

    this.logsService.createLog({
      message,
      context: context || stack,
      stack: context === undefined ? null : stack,
      level: LogLevels.ERROR,
    });
  }

  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
  }

  verbose(message: string, context?: string) {
    super.verbose.apply(this, [message, context]);
  }
}

export default CustomLogger;

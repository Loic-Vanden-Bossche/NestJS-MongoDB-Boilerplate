import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { APIConfig, CookieConfig } from './config/config';
import { checkOrigin } from './cors';
import { HttpException, Logger, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { initializeSwagger } from './swagger';
import { generateAPIDocs } from './api.doc';
import { defaultConfig, Environment } from './config/config.default';
import { triggerConfigDocGen } from '@boilerplate/config';
import { ConfigEnvironmentDto } from './config/config.environment.dto';
import * as path from 'path';
import { UsersService } from './indentity/users/users.service';
import CustomLogger from './logger/logger';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { getSameSiteStrategy } from './config/config.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService<APIConfig>>(ConfigService);
  const env = configService.get<Environment>('env');

  app.useLogger(app.get(CustomLogger));

  app.enableCors({
    origin: (origin, callback) => {
      if (
        checkOrigin(
          env,
          origin,
          configService.get<string[]>('whitelistedOrigins'),
        )
      ) {
        Logger.verbose(`Allowed origin ${origin}`, 'CORS');
        callback(null, true);
      } else {
        Logger.verbose(`Blocked origin ${origin}`, 'CORS');
        callback(new HttpException('Not allowed by CORS', 403), false);
      }
    },
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        secure: configService.get<CookieConfig>('cookie').secure,
        sameSite: getSameSiteStrategy(configService.get<Environment>('env')),
      },
      value: (req) => req.csrfToken(),
    }),
  );

  if (env !== Environment.PROD && env !== Environment.TEST) {
    const logger = new Logger('Docs');

    await initializeSwagger(app)
      .then((openapi) => {
        logger.log('Swagger initialized');

        if (env === Environment.DEV) {
          fs.writeFileSync('openapi.yaml', openapi);
          return generateAPIDocs().then((stout) => {
            logger.debug('API docs generated');
            logger.verbose(stout);
          });
        }
      })
      .catch((e) => {
        logger.error(e);
      });

    if (env === Environment.DEV) {
      await triggerConfigDocGen(
        ConfigEnvironmentDto,
        defaultConfig,
        'Exemple APP environment configuration.',
        'CONFIG.md',
        path.join(process.cwd(), 'src', 'config'),
      ).then((config) => {
        if (config) {
          logger.log('Configuration doc file generated', 'Doc');
          logger.verbose(JSON.stringify(config));
        } else {
          logger.debug('Configuration doc file already up to date');
        }
      });
    }
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.get(UsersService).createAdminAccount();

  await app.listen(configService.get<number>('port'), () => {
    Logger.log(
      `Server running on http://localhost:${configService.get<number>('port')}`,
      'Server',
    );
  });
}
bootstrap();

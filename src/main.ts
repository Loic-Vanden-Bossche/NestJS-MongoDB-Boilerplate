import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {APIConfig} from "./config/config";
import {checkOrigin} from "./cors";
import {HttpException, Logger, ValidationPipe} from "@nestjs/common";
import * as fs from "fs";
import {initializeSwagger} from "./swagger";
import {generateAPIDocs} from "./api.doc";
import {Environment} from "./config/config.default";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService<APIConfig>>(ConfigService);
  const env = configService.get<Environment>('env');

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
      /*await triggerConfigDocGen(
        'CONFIG.md',
        path.join(process.cwd(), 'src', 'config'),
      ).then((config) => {
        if (config) {
          logger.log('Configuration doc file generated', 'Doc');
          logger.verbose(JSON.stringify(config));
        } else {
          logger.debug('Configuration doc file already up to date');
        }
      });*/
    }

    app.useGlobalPipes(new ValidationPipe());

  }

  await app.listen(configService.get<number>('port'));
}
bootstrap();

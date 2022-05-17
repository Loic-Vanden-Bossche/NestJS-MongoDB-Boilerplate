import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { getConfig } from '../config/config';
import { getEnvFilesPaths } from '../config/config.utils';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../logger/logger.module';
import { LogsMiddleware } from '../logger/logs.middleware';
import { IdentityModule } from '../indentity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilesPaths(),
      validate: getConfig,
      cache: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/exemple'),
    IdentityModule,
    LoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}

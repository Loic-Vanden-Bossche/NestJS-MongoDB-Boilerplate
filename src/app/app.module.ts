import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConfig } from '../config/config';
import { getEnvFilesPaths } from '../config/config.utils';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilesPaths(),
      validate: getConfig,
      cache: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/exemple'),
    TokensModule,
    UsersModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

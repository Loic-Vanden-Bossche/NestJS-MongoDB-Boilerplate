import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { User, UserSchema } from './users/user.schema';
import { Module } from '@nestjs/common';
import { Token, TokenSchema } from './tokens/token.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getExpirationDuration } from './auth/auth.utils';
import { APIConfig, JWTConfig } from '../config/config';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { RefreshStrategy } from './auth/strategies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthController } from './auth/auth.controller';
import { TokensService } from './tokens/tokens.service';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [
    MailsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService<APIConfig>) => {
        const config = configService.get<JWTConfig>('jwt');
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: getExpirationDuration(config.expiresIn),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    UsersService,
    TokensService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UsersController, AuthController],
  exports: [UsersService, MongooseModule],
})
export class IdentityModule {}

import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { APIConfig, MailsConfig } from '../config/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService<APIConfig>) => {
        const mailsConfig = configService.get<MailsConfig>('mails');
        return {
          transport: `smtps://${mailsConfig.user}:${mailsConfig.password}@${mailsConfig.host}`,
          defaults: {
            from: `"${mailsConfig.userTag}" <${mailsConfig.user}>`,
          },
          template: {
            dir: path.join(process.cwd(), 'templates/pages'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}

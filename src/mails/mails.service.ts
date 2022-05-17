import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { APIConfig } from '../config/config';
import CurrentUser from '../indentity/users/current';
import { Token } from '../indentity/tokens/token.schema';

@Injectable()
export class MailsService {
  private readonly logger = new Logger('Mails');

  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService<APIConfig>,
  ) {}

  async sendResetPasswordEmail(to: CurrentUser, token: Token) {
    this.logger.verbose(`Sending reset password email to ${to.email}`);

    return this.mailer.sendMail({
      to: to.email,
      subject: 'Changement de mot de passe',
      template: 'change-password',
      context: {
        link: `${this.configService.get(
          'frontendUrl',
        )}/auth/change-password?token=${token.value}`,
        email: to.email,
      },
      attachments: [],
    });
  }

  async sendCreateAccountInvitation(to: CurrentUser, token: Token) {
    this.logger.verbose(`Sending invitation email to ${to.email}`);

    return this.mailer.sendMail({
      to: to.email,
      subject: 'Bienvenue sur Exemple',
      template: 'create-account',
      context: {
        link: `${this.configService.get('frontendUrl')}/auth/register?token=${
          token.value
        }`,
      },
      attachments: [],
    });
  }
}

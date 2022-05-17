import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { getExpirationDate } from './auth.utils';
import LoginAuthDto from './dto/login.auth.dto';
import RegisterAuthDto from './dto/register.auth.dto';
import { TokensService } from '../tokens/tokens.service';
import ChangePasswordDto from './dto/change-password.dto';
import { User, UserDocument } from '../users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenContext } from '../tokens/token.schema';
import CurrentUser from '../users/current';
import { MailsService } from '../../mails/mails.service';
import { APIConfig, CookieConfig, RTokenConfig } from '../../config/config';
import { Environment } from '../../config/config.default';
import { getSameSiteStrategy } from '../../config/config.utils';
import {getObjectId} from "@boilerplate/utils";

@Injectable()
export class AuthService {
  private logger = new Logger('Auth');

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<APIConfig>,
    private readonly tokensService: TokensService,
    private readonly mailsService: MailsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(userInfos: RegisterAuthDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: userInfos.email })
      .exec();
    if (user)
      throw new HttpException('Email Already Exists', HttpStatus.FORBIDDEN);

    return this.userModel.create({
      ...userInfos,
      username:
        userInfos.username || `${userInfos.firstname} ${userInfos.lastname}`,
      password: await this.hashPassword(userInfos.password),
    });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async getTokens(user: CurrentUser) {
    return {
      token: this.jwtService.sign({ ...user }),
      refreshToken: await this.generateRefreshToken(user.id).then(
        (token) => token.value,
      ),
    };
  }

  generateRefreshToken(userId: string): Promise<Token> {
    const config = this.configService.get<RTokenConfig>('rToken');
    return this.tokensService.generateToken({
      userId,
      context: TokenContext.REFRESH_STRATEGY,
      length: config.length,
      expiresAt: getExpirationDate(config.expiresIn),
    });
  }

  generateResetPasswordToken(userId: string): Promise<Token> {
    return this.tokensService.generateToken({
      userId,
      context: TokenContext.CHANGE_PASSWORD,
      length: 64,
      expiresAt: getExpirationDate('1-hour'),
    });
  }

  attachCookie(res: Response, token) {
    const env = this.configService.get<Environment>('env');
    const config = this.configService.get<CookieConfig>('cookie');

    res.cookie(config.name, token, {
      expires: getExpirationDate(config.expiresIn),
      secure: config.secure,
      sameSite: getSameSiteStrategy(env),
      httpOnly: true,
    });
  }

  async validateUserCredentials(
    credentials: LoginAuthDto,
  ): Promise<CurrentUser> {
    const user = await this.userModel
      .findOne({
        where: { email: credentials.email },
      })
      .exec();

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const valid = await this.comparePasswords(
      credentials.password,
      user.password,
    );
    if (!valid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return new CurrentUser(user);
  }

  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Token> {
    return this.tokensService.validateToken(
      userId,
      refreshToken,
      TokenContext.REFRESH_STRATEGY,
    );
  }

  async resetPassword(user: CurrentUser): Promise<string> {
    await this.generateResetPasswordToken(user.id).then((token) =>
      this.mailsService.sendResetPasswordEmail(user, token),
    );
    return 'Change-password email sent.';
  }

  async changePassword(
    currentUser: CurrentUser,
    changePassword: ChangePasswordDto,
  ) {
    const [token, user] = await Promise.all([
      this.tokensService.validateToken(
        currentUser.id,
        changePassword.token,
        TokenContext.CHANGE_PASSWORD,
      ),
      this.userModel
        .findOne(getObjectId(currentUser.id))
        .orFail(() => {
          throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
        })
        .exec(),
    ]);

    await Promise.all(
      [changePassword.oldPassword, changePassword.newPassword].map((pass) =>
        this.comparePasswords(pass, user.password),
      ),
    )
      .then(([isOk, isSame]) => {
        if (!isOk) {
          throw new Error('Bad credentials');
        }

        if (isSame) {
          throw new Error('Choose another password than your old one.');
        }
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    await this.hashPassword(changePassword.newPassword)
      .then((hash) => {
        return this.userModel
          .updateOne(getObjectId(user.id), { password: hash })
          .exec();
      })
      .then(() => this.tokensService.consumeToken(user.id, token));

    return 'Password successfully changed.';
  }
}

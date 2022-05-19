import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Token, TokenContext, TokenDocument } from './token.schema';
import * as randomToken from 'rand-token';
import * as dayjs from 'dayjs';
import { User, UserDocument } from '../users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { getObjectId } from '@boilerplate/utils';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private readonly logger = new Logger('Tokens');

  async generateToken(options: {
    userId: string;
    length?: number;
    expiresAt?: Date;
    context?: TokenContext;
    consumed?: false | null | undefined;
  }) {
    const length = options.length || 16;
    return this.tokenModel
      .create({
        id: await this.checkContext(options.context, options.userId),
        user: getObjectId(options.userId),
        value: randomToken.generate(length),
        expiresAt: options.expiresAt || null,
        length,
        context: options.context || null,
        consumed: options.consumed === undefined ? false : options.consumed,
      })
      .then((token) => {
        this.logger.verbose(
          `Generated token ${JSON.stringify(
            this.getReadableToken(token, options.userId),
          )}`,
        );
        return token;
      });
  }

  async checkContext(
    context: TokenContext,
    userId: string,
  ): Promise<Types.ObjectId | undefined> {
    return this.tokenModel
      .findOne({ context, user: getObjectId(userId), consumed: false })
      .exec()
      .then((token) => {
        if (token) {
          this.logger.verbose(
            `[${context}] Valid token already exists for user ${userId}, regenerating...`,
          );
          return getObjectId(token.id);
        }
        this.logger.verbose(
          `[${context}] Generating new token for user ${userId}`,
        );
        return undefined;
      });
  }

  async consumeToken(userId: string, token: TokenDocument) {
    const readableToken = JSON.stringify(this.getReadableToken(token, userId));
    if (token.consumed === null) {
      this.logger.verbose(`Token used, not consumed ${readableToken}`);
      return;
    }
    this.logger.verbose(`Token used, consumed ${readableToken}`);
    token.consumed = true;
    return token.save();
  }

  getReadableToken(token: Token, userId: string) {
    return {
      user: getObjectId(userId),
      value: token.value,
      context: token.context || 'No context (restricted)',
      consumed:
        token.consumed === null
          ? 'Infinite use'
          : token.consumed
          ? 'Yes'
          : 'No',
      expiration: token.expiresAt
        ? dayjs(token.expiresAt).format('YYYY-MM-DD HH:mm:ss')
        : 'Never',
    };
  }

  async validateToken(userId: string, value: string, context?: TokenContext) {
    try {
      await this.userModel
        .findOne(getObjectId(userId))
        .orFail(() => {
          throw new Error('User not found');
        })
        .exec();

      const token = await this.tokenModel
        .findOne({
          user: getObjectId(userId),
          value,
          context: context || null,
        })
        .orFail(() => {
          throw new Error('Token not found');
        })
        .exec();

      if (token.expiresAt && dayjs(token.expiresAt).isBefore(dayjs())) {
        throw new Error('Token expired');
      }

      if (token.consumed === true) {
        throw new Error('Token already consumed');
      }

      return token;
    } catch (e) {
      throw new HttpException(
        `Invalid token - ${e.message}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}

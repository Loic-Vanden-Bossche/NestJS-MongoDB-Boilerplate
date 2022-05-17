import { User } from '../users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export enum TokenContext {
  REGISTER_USER = 'register_user',
  CHANGE_PASSWORD = 'change_password',
  REFRESH_STRATEGY = 'refresh_strategy',
}

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Token' })
  id: Types.ObjectId;

  @Prop()
  value: string;

  @Prop()
  length: number;

  @Prop({ enum: TokenContext, type: String })
  context: TokenContext;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  user: User;

  @Prop({ type: Boolean, default: false })
  consumed: boolean;

  @Prop()
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

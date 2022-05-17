import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Token } from '../tokens/token.schema';
import { Role } from '../../shared/role';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    default: Role.User,
    enum: Role,
    type: String,
  })
  role: Role;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }] })
  tokens: Token[];
}

export const UserSchema = SchemaFactory.createForClass(User);

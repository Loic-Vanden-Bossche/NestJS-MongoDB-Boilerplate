import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LogLevels } from './log-levels';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ type: SchemaTypes.ObjectId, ref: Log.name })
  id: Types.ObjectId;

  @Prop()
  context: number;

  @Prop()
  message: string;

  @Prop()
  stack: string;

  @Prop({
    type: String,
    enum: LogLevels,
    default: LogLevels.LOG,
  })
  level: LogLevels;
}

export const LogSchema = SchemaFactory.createForClass(Log);

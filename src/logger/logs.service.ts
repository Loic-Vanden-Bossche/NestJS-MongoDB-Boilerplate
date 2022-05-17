import { Injectable } from '@nestjs/common';
import { Log, LogDocument } from './log.schema';
import CreateLogDto from './create.log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  createLog(log: CreateLogDto) {
    return this.logModel.create(log);
  }
}

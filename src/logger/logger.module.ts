import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import CustomLogger from './logger';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class LoggerModule {}

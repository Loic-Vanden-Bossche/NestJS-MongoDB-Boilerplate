import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LogLevels } from './log-levels';

export default class CreateLogDto {
  @IsEnum(LogLevels)
  @IsNotEmpty()
  level: LogLevels;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  stack?: string;

  @IsString()
  @IsNotEmpty()
  context: string;
}

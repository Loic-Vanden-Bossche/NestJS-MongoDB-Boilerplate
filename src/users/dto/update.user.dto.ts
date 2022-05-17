import {
  IsDate,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(32)
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstname: string;

  @IsString()
  @IsOptional()
  @MaxLength(32)
  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastname: string;

  @IsString()
  @IsOptional()
  @MaxLength(32)
  @ApiProperty({
    description: 'User nickname',
    example: 'Johnny',
  })
  username?: string;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string;

  @IsString()
  @IsOptional()
  @Length(16)
  refreshToken?: string;

  @IsDate()
  @IsOptional()
  refreshTokenExpiresAt?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'User avatar seed',
    example: 'yXIwnkiN4CJclKEk0pm0',
  })
  avatarSeed?: string;
}

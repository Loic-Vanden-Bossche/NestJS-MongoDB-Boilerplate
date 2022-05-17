import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../shared/role';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'exemple.test@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(32)
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(32)
  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(32)
  @ApiProperty({
    description: 'User nickname',
    example: 'Johnny',
  })
  username?: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    description: 'User role',
    example: 'super_admin',
  })
  role?: Role;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password?: string;
}

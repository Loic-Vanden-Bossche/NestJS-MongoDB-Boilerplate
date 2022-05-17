import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Change password token',
    example: 'b7wCwIHaRkhhCJW5IfZN8LzehT1SoE98Y4ZfmrCE8X9gj14TrWqBBdbhXzjm2vzb',
  })
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Old user password',
    example: '123456',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'New user password',
    example: '12345612',
  })
  newPassword: string;
}

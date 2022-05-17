import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';

export default class CurrentUser {
  constructor(user: Partial<User>) {
    this.id = user.id.toString();
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
  }

  @ApiProperty({
    description: "The user's id",
    example: '5e9f8f8f8f8f8f8f8f8f8f8f8',
  })
  id: string = null;

  @ApiProperty({
    description: "The user's email",
    example: 'exemplle.test@gmail.com',
  })
  email: string = null;

  @ApiProperty({
    description: "The user's first name",
    example: 'John',
  })
  firstname: string = null;

  @ApiProperty({
    description: "The user's last name",
    example: 'Doe',
  })
  lastname: string = null;

  @ApiProperty({
    description: "The user's nickname",
    example: 'Johnny',
  })
  username: string = null;
}

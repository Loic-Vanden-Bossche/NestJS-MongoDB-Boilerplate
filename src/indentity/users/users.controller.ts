import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create.user.dto';
import UpdateUserDto from './dto/update.user.dto';
import UpdateMeDto from './dto/update.me.dto';
import { Role } from '../../shared/role';
import { Roles } from '../../shared/decorators/roles.decorator';
import { User } from '../../shared/decorators/user.decorator';
import { checkObjectId } from '@boilerplate/utils';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.SuperAdmin)
  @Get()
  @ApiOperation({ summary: '[SuperAdmin] Get all users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Roles(Role.SuperAdmin)
  @Get('/:id')
  @ApiOperation({ summary: '[SuperAdmin] Get specific user' })
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(checkObjectId(id));
  }

  @Roles(Role.SuperAdmin)
  @Post()
  @ApiOperation({ summary: '[SuperAdmin] Create new user' })
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Roles(Role.User)
  @Put('/me')
  @ApiOperation({ summary: '[User] Update self' })
  async updateMe(@User() user, @Body() selfUpdate: UpdateMeDto) {
    return this.usersService.updateMe(user, selfUpdate);
  }

  @Roles(Role.SuperAdmin)
  @Put('/:id')
  @ApiOperation({ summary: '[SuperAdmin] Update specific user' })
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(checkObjectId(id), user);
  }

  @Roles(Role.SuperAdmin)
  @Delete('/:id')
  @ApiOperation({ summary: '[SuperAdmin] Delete specific user' })
  async deleteUser(@Param('id') id: string) {
    return this.usersService.delete(checkObjectId(id));
  }
}

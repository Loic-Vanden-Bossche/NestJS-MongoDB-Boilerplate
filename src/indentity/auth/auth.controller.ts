import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import LoginAuthDto from './dto/login.auth.dto';
import RegisterAuthDto from './dto/register.auth.dto';
import ChangePasswordAuthDto from './dto/change-password.auth.dto';
import CurrentUser from '../users/current';
import { Public } from '../../shared/decorators/public.decorator';
import { User } from '../../shared/decorators/user.decorator';
import ResetPasswordDto from './dto/reset-password.auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '[Public] Login using credentials' })
  @ApiBody({
    description: 'Login data',
    type: LoginAuthDto,
  })
  @ApiOkResponse({
    description: 'Login successful',
    type: CurrentUser,
    headers: {
      'Set-Cookie': {
        description: 'Authorization cookie',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Login failed - Bad credentials',
  })
  async login(
    @User() user: CurrentUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CurrentUser> {
    this.authService.attachCookie(res, await this.authService.getTokens(user));
    return user;
  }

  @Public()
  @Get('logout')
  @ApiOperation({ summary: 'Reset current cookie' })
  logout(
    @User() user: CurrentUser,
    @Res({ passthrough: true }) res: Response,
  ): { message: string } {
    this.authService.clearCookie(res);
    return { message: 'success' };
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: '[Public] Register standalone/organization' })
  @ApiCreatedResponse({
    description: 'Register successful',
    type: CurrentUser,
    headers: {
      'Set-Cookie': {
        description: 'Authorization cookie',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Register failed - Email already exists',
  })
  async register(
    @Body() userInfos: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string | CurrentUser> {
    const user = await this.authService
      .register(userInfos)
      .then((u) => new CurrentUser(u));
    this.authService.attachCookie(res, await this.authService.getTokens(user));
    return user;
  }

  @Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh'))
  @ApiCookieAuth()
  @ApiOperation({ summary: '[User] Get a new jwt using refresh token' })
  @ApiOkResponse({
    description: 'Refresh token successful',
    headers: {
      'Set-Cookie': {
        description: 'Authorization cookie',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token failed - Expired token or not logged in',
  })
  async regenerateTokens(
    @User() user: CurrentUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ msg: string }> {
    this.authService.attachCookie(res, await this.authService.getTokens(user));
    return { msg: 'success' };
  }

  @Get('me')
  @ApiCookieAuth()
  @ApiOperation({ summary: '[User] Get the currently logged user' })
  @ApiOkResponse({
    description: 'Current logged user',
    type: CurrentUser,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in',
  })
  getProfile(@User() user: CurrentUser): CurrentUser {
    return user;
  }

  @Public()
  @Get('reset-password')
  @ApiOperation({ summary: 'Trigger reset-password procedure' })
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }

  @Public()
  @Post('change-password')
  @ApiOperation({ summary: 'Change the password using token' })
  changePassword(@Body() changePassword: ChangePasswordAuthDto) {
    return this.authService.changePassword(changePassword);
  }
}

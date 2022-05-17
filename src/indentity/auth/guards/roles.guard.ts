import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import CurrentUser from '../../users/current';
import { Role } from '../../../shared/role';
import { ROLES_KEY } from '../../../shared/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest() as {
      user: CurrentUser;
    };

    if (!requiredRoles || user.role === Role.SuperAdmin) {
      return true;
    }

    if (requiredRoles.includes(user.role)) return true;

    throw new HttpException(
      'You dont have suffisent privileges',
      HttpStatus.FORBIDDEN,
    );
  }
}

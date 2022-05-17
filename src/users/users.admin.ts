/*import { AdminConfig } from '../config/config';
import { User } from './user.schema';
import { Logger } from '@nestjs/common';
import { Role } from '../shared/role';

import { defaultConfig } from '../config/config.default';
import { AuthService } from '../auth/auth.service';

export const createAdminAccount = async (
  adminConfig: AdminConfig,
  authService: AuthService,
) => {
  const logger = new Logger('Admin');
  logger.verbose('Checking admin account');

  if (adminConfig.password === defaultConfig.CA_ADMIN_PASSWORD) {
    logger.warn(
      `Admin password is default password, please change it if in production`,
    );
  }

  const user = await User.findOne({ where: { email: adminConfig.email } });

  if (user) {
    logger.verbose(`Admin ${user.email} already exists`);

    const validPassword = await authService.comparePasswords(
      adminConfig.password,
      user.password,
    );

    if (validPassword) {
      logger.verbose(`Password for admin ${user.email} is valid`);
      return;
    }

    logger.log(`Password for admin ${user.email} is invalid, updating`);

    user.password = await authService.hashPassword(adminConfig.password);
    await user.save();

    return;
  }

  logger.log(`Admin ${adminConfig.email} not found in database, creating`);

  await User.create({
    email: adminConfig.email,
    password: await authService.hashPassword(adminConfig.password),
    role: Role.SuperAdmin,
  }).save();
  logger.log(`Admin ${adminConfig.email} created`);
};*/

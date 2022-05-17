import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import CreateUserDto from './dto/create.user.dto';
import UpdateUserDto from './dto/update.user.dto';
import UpdateMeDto from './dto/update.me.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CurrentUser from './current';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { AdminConfig } from '../../config/config';
import { defaultConfig } from '../../config/config.default';
import { Role } from '../../shared/role';
import {getObjectId} from "@boilerplate/utils";

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  findById(id: string) {
    return this.userModel.findOne(getObjectId(id)).exec();
  }

  findByIdAndRefreshToken(userId: string, refreshToken: string) {
    return this.userModel
      .findOne({
        where: { userId, refreshToken },
      })
      .exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } }).exec();
  }

  async isAlreadyExist(email: string) {
    const existsUser = await this.userModel
      .findOne({ where: { email } })
      .exec();
    if (existsUser)
      throw new HttpException(
        `User ${existsUser.email} already exists`,
        HttpStatus.FORBIDDEN,
      );
  }

  async create(user: CreateUserDto) {
    await this.isAlreadyExist(user.email);

    return this.userModel.create({
      ...user,
      password: await this.authService.hashPassword(user.password),
    });
  }

  isExist(id: string) {
    return this.userModel
      .findOne(getObjectId(id))
      .orFail(() => {
        throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
      })
      .exec();
  }

  async updateMe(user: CurrentUser, selfUpdate: UpdateMeDto) {
    await this.isExist(user.id);
    return this.userModel
      .findByIdAndUpdate(getObjectId(user.id), selfUpdate)
      .exec()
      .then((updated) => new CurrentUser({ ...user, ...updated }));
  }

  async update(id: string, userUpdate: UpdateUserDto) {
    await this.isExist(id);
    return this.userModel.findByIdAndUpdate(getObjectId(id), userUpdate).exec();
  }

  delete(id: string) {
    return this.userModel.deleteOne(getObjectId(id)).exec();
  }

  async createAdminAccount() {
    const adminConfig = this.configService.get<AdminConfig>('admin');

    const logger = new Logger('Admin');
    logger.verbose('Checking admin account');

    if (adminConfig.password === defaultConfig.AP_ADMIN_PASSWORD) {
      logger.warn(
        `Admin password is default password, please change it if in production`,
      );
    }

    const user = await this.userModel
      .findOne({ email: adminConfig.email })
      .exec();

    if (user) {
      logger.verbose(`Admin ${user.email} already exists`);

      const validPassword = await this.authService.comparePasswords(
        adminConfig.password,
        user.password,
      );

      if (validPassword) {
        logger.verbose(`Password for admin ${user.email} is valid`);
        return;
      }

      logger.log(`Password for admin ${user.email} is invalid, updating`);

      user.password = await this.authService.hashPassword(adminConfig.password);
      await user.save();

      return;
    }

    logger.log(`Admin ${adminConfig.email} not found in database, creating`);

    await this.userModel.create({
      email: adminConfig.email,
      password: await this.authService.hashPassword(adminConfig.password),
      role: Role.SuperAdmin,
    });
    logger.log(`Admin ${adminConfig.email} created`);
  }
}

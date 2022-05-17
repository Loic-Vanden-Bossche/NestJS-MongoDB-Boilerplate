import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import CreateUserDto from './dto/create.user.dto';
import UpdateUserDto from './dto/update.user.dto';
import UpdateMeDto from './dto/update.me.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CurrentUser from './current';
import { getObjectId } from '../shared/utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
      password: 'await this.authService.hashPassword(user.password)',
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
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

const isObjectId = (id: string) => {
  if (!id) return false;
  return /^[0-9a-fA-F]{24}$/i.test(id);
};

export const checkObjectId = (str: string): string => {
  if (!isObjectId(str))
    throw new HttpException('Invalid Object Id', HttpStatus.BAD_REQUEST);
  return str;
};

export const getObjectId = (id: string): Types.ObjectId => {
  return new Types.ObjectId(id);
};

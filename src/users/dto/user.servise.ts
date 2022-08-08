import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../schemas/users.schema';
import { CreateUserDto } from './create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private viewsModel: typeof Users,
  ) {}

  async getAll(): Promise<Users[]> {
    return this.viewsModel.findAll();
  }

  async getOne(username: string) {
    return this.viewsModel.findOne({
      where: {
        username,
      },
    });
  }

  async create(payload: CreateUserDto): Promise<Users> {
    const hash = await argon2.hash(payload.password);
    const newView = new this.viewsModel({
      username: payload.username,
      password: payload.password,
      key: payload.key,
    });

    return newView.save();
  }
}
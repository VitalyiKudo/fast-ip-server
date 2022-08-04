import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../schemas/users.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private viewsModel: typeof Users,
  ) {}

  async getAll(): Promise<Users[]> {
    return this.viewsModel.findAll();
  }

  async create(payload: CreateUserDto): Promise<Users> {
    const newView = new this.viewsModel(payload);

    return newView.save();
  }
}

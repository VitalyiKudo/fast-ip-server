import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../schemas/users.schema';
import { CreateUserDto } from './create-user.dto';
import * as argon2 from 'argon2';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
    private authService: AuthService,
  ) {}

  async getAll(): Promise<Users[]> {
    return this.usersModel.findAll();
  }

  async getOne(username: string) {
    return this.usersModel.findOne({
      where: {
        username,
      },
    });
  }

  async updateRefreshToken(username, refreshTonen) {
    const user = await this.getOne(username);

    user.refresh_token = refreshTonen;

    return refreshTonen;
  }

  async login(payload: any) {
    const user = await this.getOne(payload.username);

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon2.verify(
      user.password,
      payload.password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.authService.getTokens(user);

    await this.updateRefreshToken(user.username, tokens.refresh_token);

    return tokens;
  }

  async create(payload: CreateUserDto): Promise<any> {
    const hash = await argon2.hash(payload.password);
    const tokens = await this.authService.getTokens(payload);
    const newView = new this.usersModel({
      username: payload.username,
      password: hash,
      key: payload.key,
      access_token: tokens.acces_token,
      refresh_token: tokens.refresh_token,
    });

    newView.save();

    return tokens;
  }
}

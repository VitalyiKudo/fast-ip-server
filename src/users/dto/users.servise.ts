import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../schemas/users.schema';
import { CreateUserDto } from './create-user.dto';
import * as argon2 from 'argon2';
import { AuthService } from 'src/auth/auth.service';
import { Tokens } from 'src/auth/types';

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

  async create(payload: CreateUserDto): Promise<any> {
    const hash = await argon2.hash(payload.password);
    const tokens = await this.authService.getTokens(payload);
    const newView = new this.usersModel({
      username: payload.username,
      password: hash,
      key: payload.key,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    newView.save();

    return tokens;
  }

  async updateTokens(username: string, token: Tokens) {
    const user = await this.getOne(username);

    user.refresh_token = token.refresh_token;
    user.access_token = token.access_token;

    user.save();

    return token;
  }

  async refreshTokens(header: string) {
    const refresh_token = header.replace('Bearer', '').trim();

    const user = await this.usersModel.findOne({
      where: {
        refresh_token,
      },
    });

    if (!user) throw new ForbiddenException(`Acces Denied`);

    const refreshToken = header.replace('Bearer', '').trim();

    const rtMatches = refreshToken === user.refresh_token;

    if (!rtMatches) throw new ForbiddenException('Bad password');

    const tokens = await this.authService.getTokens(user);

    await this.updateTokens(user.username, {
      access_token: tokens.access_token,
    });

    return tokens;
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

    await this.updateTokens(user.username, tokens);

    return tokens;
  }

  async logout(header: string): Promise<boolean> {
    const access_token = header.replace('Bearer', '').trim();

    const user = await this.usersModel.findOne({
      where: {
        access_token,
      },
    });

    await this.updateTokens(user.username, {
      access_token: null,
      refresh_token: null,
    });

    user.save();

    return true;
  }

  async profile(header: string): Promise<any> {
    const access_token = header.replace('Bearer', '').trim();

    const user = await this.usersModel.findOne({
      where: {
        access_token,
      },
    });

    return {
      username: user.username,
      key: user.key,
    };
  }
}

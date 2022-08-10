import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/dto/user.servise';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getOne(username);
    if (user && user.password === password) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { username: user.username, sub: user.key };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

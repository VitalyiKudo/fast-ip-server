import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getTokens(user: CreateUserDto) {
    const payload = { username: user.username, sub: user.key };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'at-secret',
        expiresIn: '60m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'rt-secret',
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

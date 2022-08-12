import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import {
  AccessTokenStrategy,
  ProfileStrategy,
  RefreshTokenStrategy,
} from './strategies';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ProfileStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

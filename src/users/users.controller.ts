import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './dto/users.servise';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/profile')
  getProfile(@Headers() header) {
    return this.usersService.profile(header.authorization);
  }

  @Get(':username')
  getOne(@Param() params) {
    return this.usersService.getOne(params.username);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: CreateUserDto) {
    return this.usersService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() user: CreateUserDto) {
    return this.usersService.logout(user.username);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() user, @Headers() headers) {
    return this.usersService.refreshTokens(
      user.username,
      headers.authorization,
    );
  }
}

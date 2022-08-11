import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './dto/users.servise';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':username')
  getOne(@Param() params) {
    return this.usersService.getOne(params.username);
  }

  @Post('/login')
  login(@Body() user: CreateUserDto) {
    return this.usersService.login(user);
  }

  @Post('/register')
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}

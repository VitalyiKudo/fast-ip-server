import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './dto/user.servise';
import { Users } from './schemas/users.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

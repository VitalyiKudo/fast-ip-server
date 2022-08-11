import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './dto/users.servise';
import { Users } from './schemas/users.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

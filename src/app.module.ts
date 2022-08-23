import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewsModule } from './views/views.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_URI,
      database: 'dtn93i68rsu4h',
      username: 'yrorrpnitumbpk',
      password:
        '7e6075bb13758ac4342d07607d0b71484bc610b1eef7e5ea37ef986d353f1083',
      synchronize: true,
      autoLoadModels: true,
    }),
    ViewsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

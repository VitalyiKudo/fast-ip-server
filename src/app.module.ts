import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewsModule } from './views/views.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'for_views',
      autoLoadModels: true,
    }),
    ViewsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

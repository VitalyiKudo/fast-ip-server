import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewsService } from './dto/views.servise';
import { Views } from './schemas/views.schema';
import { ViewsController } from './views.controller';

@Module({
  imports: [SequelizeModule.forFeature([Views])],
  providers: [ViewsService],
  controllers: [ViewsController],
})
export class ViewsModule {}

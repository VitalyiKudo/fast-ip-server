import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Views } from '../schemas/views.schema';
import { CreateViewDto } from './create-view.dto';

@Injectable()
export class ViewsService {
  constructor(
    @InjectModel(Views)
    private viewsModel: typeof Views,
  ) {}

  async getAll(key: string): Promise<Views[]> {
    return this.viewsModel.findAll({
      where: {
        key,
      },
    });
  }

  async create(payload: CreateViewDto): Promise<Views> {
    const newView = new this.viewsModel(payload);

    return newView.save();
  }
}

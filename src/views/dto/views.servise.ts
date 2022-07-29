import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Views } from '../schemas/views.schema';
import { CreateViewDto } from './create-view.dto';

@Injectable()
export class ViewsService {
  constructor(
    @InjectModel(Views)
    private viewsModul: typeof Views,
  ) {}

  async getAll(): Promise<Views[]> {
    return this.viewsModul.findAll();
  }

  async create(payload: CreateViewDto): Promise<Views> {
    const newView = new this.viewsModul(payload);

    return newView.save();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { ViewsService } from './dto/views.servise';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get()
  getAll() {
    return this.viewsService.getAll();
  }

  @Post()
  create(@Body() view: CreateViewDto) {
    return this.viewsService.create(view);
  }
}

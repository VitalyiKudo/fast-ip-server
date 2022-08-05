import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { ViewsService } from './dto/views.servise';

@Controller('users/:id/views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get()
  getAll(@Param() params) {
    return this.viewsService.getAll(params.id);
  }

  @Post()
  create(@Body() view: CreateViewDto) {
    return this.viewsService.create(view);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IParents } from '../interface/parents';
import { ParentsService } from './parents.service';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Get()
  findAll() {
    return this.parentsService.findAll();
  }

  @Post()
  create(@Body() body: IParents) {
    return this.parentsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<IParents>) {
    return this.parentsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentsService.remove(id);
  }
}

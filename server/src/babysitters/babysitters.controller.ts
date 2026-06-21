import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IBabysitter, IReview } from '../interface/BabysitterType';
import { BabysittersService } from './babysitters.service';

@Controller('babysitter')
export class BabysittersController {
  constructor(private readonly babysittersService: BabysittersService) {}

  @Post()
  create(@Body() body: IBabysitter) {
    return this.babysittersService.create(body);
  }

  @Get()
  findAll() {
    return this.babysittersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.babysittersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<IBabysitter>) {
    return this.babysittersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.babysittersService.remove(id);
  }

  @Post(':id/reviews')
  addReview(@Param('id') id: string, @Body() body: Omit<IReview, 'createdAt'>) {
    return this.babysittersService.addReview(id, body);
  }

  @Get(':id/reviews')
  getReviews(@Param('id') id: string) {
    return this.babysittersService.getReviews(id);
  }

  @Delete(':id/reviews/:reviewId')
  deleteReview(@Param('id') id: string, @Param('reviewId') reviewId: string) {
    return this.babysittersService.deleteReview(id, reviewId);
  }
}

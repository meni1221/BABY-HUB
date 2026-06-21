import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';

@Module({
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}

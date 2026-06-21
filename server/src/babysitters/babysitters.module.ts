import { Module } from '@nestjs/common';
import { BabysittersController } from './babysitters.controller';
import { BabysittersService } from './babysitters.service';

@Module({
  controllers: [BabysittersController],
  providers: [BabysittersService],
})
export class BabysittersModule {}

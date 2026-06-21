import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BabysittersModule } from './babysitters/babysitters.module';
import { OrdersModule } from './orders/orders.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [AuthModule, BabysittersModule, OrdersModule, ParentsModule],
})
export class AppModule {}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import IOrder from '../interface/orderType';
import OrderModel from '../models/orderModel';

@Injectable()
export class OrdersService {
  async create(data: IOrder) {
    if (!data.parent_id || !data.babysitter_id || !data.number_working) {
      throw new BadRequestException('One of the details is missing');
    }

    const order = new OrderModel(data);
    return order.save();
  }

  async findAll() {
    return OrderModel.find();
  }

  async findOne(id: string) {
    const order = await OrderModel.findOne({ babysitter_id: id });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, data: Partial<IOrder>) {
    const existingOrder = await OrderModel.findById(id);

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    return OrderModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      throw new NotFoundException('Order not found');
    }

    return { message: 'Order deleted successfully' };
  }
}

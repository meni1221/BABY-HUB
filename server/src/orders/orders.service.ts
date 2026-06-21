import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { logAndRethrow } from '../common/error-logger';
import IOrder from '../interface/orderType';
import OrderModel from '../models/orderModel';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  async create(data: IOrder) {
    try {
      this.logger.log(
        `INFO creating order parent=${data.parent_id} babysitter=${data.babysitter_id}`,
      );

      if (!data.parent_id || !data.babysitter_id || !data.number_working) {
        this.logger.warn('WARN create order failed: missing details');
        throw new BadRequestException('One of the details is missing');
      }

      const order = new OrderModel(data);
      const savedOrder = await order.save();

      this.logger.log(`INFO order created: ${savedOrder._id}`);
      return savedOrder;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR create order failed', error);
    }
  }

  async findAll() {
    try {
      this.logger.log('INFO fetching orders');
      const orders = await OrderModel.find();
      this.logger.log(`INFO fetched ${orders.length} orders`);
      return orders;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR fetch orders failed', error);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`INFO fetching order for babysitter: ${id}`);
      const order = await OrderModel.findOne({ babysitter_id: id });

      if (!order) {
        this.logger.warn(`WARN order not found for babysitter: ${id}`);
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR fetch order failed: ${id}`, error);
    }
  }

  async update(id: string, data: Partial<IOrder>) {
    try {
      this.logger.log(`INFO updating order: ${id}`);
      const existingOrder = await OrderModel.findById(id);

      if (!existingOrder) {
        this.logger.warn(`WARN update order failed, not found: ${id}`);
        throw new NotFoundException('Order not found');
      }

      const updatedOrder = await OrderModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      this.logger.log(`INFO order updated: ${id}`);
      return updatedOrder;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR update order failed: ${id}`, error);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`INFO deleting order: ${id}`);
      const deletedOrder = await OrderModel.findByIdAndDelete(id);

      if (!deletedOrder) {
        this.logger.warn(`WARN delete order failed, not found: ${id}`);
        throw new NotFoundException('Order not found');
      }

      this.logger.log(`INFO order deleted: ${id}`);
      return { message: 'Order deleted successfully' };
    } catch (error) {
      logAndRethrow(this.logger, `ERROR delete order failed: ${id}`, error);
    }
  }
}

import { handleBadRequest } from '../../utils/handleError';
import IOrder from '../interface/orderType';
import orderModel from '../models/orderModel';

const addOrder = async (dataorder: IOrder) => {
  try {
    if (!dataorder.parent_id || !dataorder.babysitter_id || !dataorder.number_working) {
      throw new Error('One of the details is missing');
    }
    const newOrder = new orderModel(dataorder);
    await newOrder.save();
    return newOrder;
  } catch (error) {
    return handleBadRequest('MongoDB', error);
  }
};


const getAllOrders = async () => {
  try {
    const orders = await orderModel.find();
    return orders;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const order = await orderModel.findOne({ babysitter_id: orderId });

    if (!order) {
      throw new Error('order not found');
    }

    return order;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const patchOrder = async (orderId: string, updateData: Partial<IOrder>) => {
  try {
    const existingOrder = await orderModel.findById(orderId);
    if (!existingOrder) {
      throw new Error('order not found');
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {
        ...updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedOrder;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const deleteOrder = async (orderid: string) => {
  try {
    const deletedorder = await orderModel.findByIdAndDelete(orderid);
    if (!deletedorder) {
      throw new Error('order not found');
    }
    return { message: 'order deleted successfully' };
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

export { addOrder, getAllOrders, getOrderById, patchOrder, deleteOrder };

import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../interface/orderType';
import parentModel from '../models/ParentsModel';
import babysitterModel from '../models/BabysitterModel';

const orderSchema: Schema = new Schema(
  {
    status: {
      type: String,
      enum: ['waiting', 'approved', 'Done', 'rejected'],
      default: 'waiting',
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: parentModel,
      required: true,
    },
    babysitter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: babysitterModel,
      required: true,
    },
    number_working: {
      type: Number,
      required: true,
    },
    expectations: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('order', orderSchema);

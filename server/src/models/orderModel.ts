import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interface/orderType";

const orderSchema: Schema = new Schema(
  {
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    babysitter_id: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<IOrder>("order", orderSchema);

import mongoose, { Schema } from "mongoose";
import { IAddress } from "../interface/address";

const adderssSchema: Schema = new Schema({
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  street: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  buildingNumber: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 3,
  },
});
export default mongoose.model<IAddress>("adderss", adderssSchema);

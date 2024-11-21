import mongoose, { Schema } from "mongoose";
import { IParents } from "../interface/parents";
import AdderssSchema from "../models/AddressModel";

const ParentsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  amount: {
    type: Number,
    require: true,
    minlength: 1,
    maxlength: 21,
  },
  address: {
    type: { AdderssSchema },
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  budget: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
});

export default mongoose.model<IParents>("Parents", ParentsSchema);

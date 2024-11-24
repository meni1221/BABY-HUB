import mongoose, { Schema } from 'mongoose';
import { IParents } from '../interface/parents';
import AdderssSchema from '../models/AddressModel';

const ParentsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  amount: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 21,
  },
  address: {
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
  },
  phone: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});
export default mongoose.model<IParents>('Parents', ParentsSchema);

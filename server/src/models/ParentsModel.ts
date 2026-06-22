import mongoose, { Schema } from 'mongoose';
import { IParents } from '../interface/parents';

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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetExpires: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

ParentsSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IParents>('Parents', ParentsSchema);

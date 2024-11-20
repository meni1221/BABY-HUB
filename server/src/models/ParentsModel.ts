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
    type: Number,
    require: true,
    // תבנית פשוטה למספר טלפון ישראלי
    match: [/^0[2-9]\d{7,8}$/, "אנא הכנס מספר טלפון תקין"],
  },
  budget: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    // תבנית בסיסית לבדיקת אימייל
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "אנא הכנס אימייל תקין"],
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

export default mongoose.model<IParents>("parents", ParentsSchema);

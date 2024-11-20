import mongoose, { Schema } from "mongoose";
import { IBabysitter } from "../interface/BabysitterType";

const BabysitterSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    age: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7Ve418_z0FUjCaMMdgeBOxEnaX6wbhG8kY70C_7Hxeu8WJyzNg2PUg0VHIk9vdb1MdqCYRjbzpE3xkyLFJJLJPsKgzoNvCk5nQJusMavMfGGb3QLJw1Tv-xfdW8mfh6RcLJEHqERHmAA&usqp=CAc",
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      // תבנית פשוטה למספר טלפון ישראלי
      match: [/^0[2-9]\d{7,8}$/, "אנא הכנס מספר טלפון תקין"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // תבנית בסיסית לבדיקת אימייל
      match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "אנא הכנס אימייל תקין"],
    },
    preferences: {
      type: [String],
    },
    experience: {
      type: String,
    },
    about: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    likes: {
      type: [String],
    },
    budget: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBabysitter>("Babysitter", BabysitterSchema);

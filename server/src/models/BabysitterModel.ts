import mongoose, { Schema } from 'mongoose';
import { IBabysitter } from '../interface/BabysitterType';

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
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7Ve418_z0FUjCaMMdgeBOxEnaX6wbhG8kY70C_7Hxeu8WJyzNg2PUg0VHIk9vdb1MdqCYRjbzpE3xkyLFJJLJPsKgzoNvCk5nQJusMavMfGGb3QLJw1Tv-xfdW8mfh6RcLJEHqERHmAA&usqp=CAc',
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      // תבנית פשוטה למספר טלפון ישראלי
      match: [/^0[2-9]\d{7,8}$/, 'אנא הכנס מספר טלפון תקין'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      required: true,
    },
    reviews: [
      {
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// מסתיר את הסיסמה כשמחזירים את המשתמש
BabysitterSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IBabysitter>('Babysitter', BabysitterSchema);

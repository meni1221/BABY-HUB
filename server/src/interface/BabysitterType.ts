export interface IReview {
  _id?: {
    toString: () => string;
  };
  userId: string;
  comment: string;
  rating: number;
  createdAt: Date;
}
export interface IBabysitter extends Document {
  name: string;
  age: number;
  image: string;
  address: string;
  phone: string;
  email: string;
  preferences: [string];
  experience: string;
  about: string;
  price: number;
  likes: [string];
  password: string;
  passwordResetExpires?: Date;
  passwordResetToken?: string;
  reviews: IReview[];
}

export default IBabysitter;

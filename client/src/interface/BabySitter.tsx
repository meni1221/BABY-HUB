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
  budget: number;
  password: string;
  _id?: string;
}

export default IBabysitter;

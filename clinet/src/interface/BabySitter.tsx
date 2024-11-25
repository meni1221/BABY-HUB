export interface IBabysitter extends Document {
  _id?: string;
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
}

export default IBabysitter;

import { IAddress } from "./address";

export interface IParents extends Document {
  name: string;
  amount: number;
  address: IAddress;
  phone: string;
  email: string;
  password: string;
  passwordResetExpires?: Date;
  passwordResetToken?: string;
  isAdmin: boolean;
}

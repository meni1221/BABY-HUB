import { IAddress } from "./Aadress";

export interface IParents extends Document {
  name: string;
  amount: number;
  address: IAddress;
  phone: string;
  budget: number;
  email: string;
  password: string;
  isAdmin: boolean;
  _id?: string;
}

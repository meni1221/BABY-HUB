import { IAddress } from "./address";

export interface IParents extends Document {
  name: string;
  amount: number;
  address: IAddress;
  phone: number;
  budget: number;
  email: string;
  isAdmin: boolean;
}

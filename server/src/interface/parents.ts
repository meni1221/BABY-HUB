import { IAddress } from "./address";

export interface IParents extends Document {
  name: string;
  amount: number;
  address: IAddress;
  phone: string;
  budget: number;
  email: string;
  password: string;
  isAdmin: boolean;
}
// export default mongoose.model<IParents>("User");
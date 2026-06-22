export interface IOrder extends Document {
  _id?: string;
  status: string;
  parent_id: string;
  babysitter_id: string;
  number_working: number;
  expectations: string;
}
export default IOrder;

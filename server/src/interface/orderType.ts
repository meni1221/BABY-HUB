import { ObjectId } from "mongoose";

export interface IOrder extends Document {
    parent_id: ObjectId;
    babysitter_id: ObjectId;
    number_working: number;
    expectations: string;  
  }
  
  export default IOrder






  
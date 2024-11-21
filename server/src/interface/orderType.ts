export interface IOrder extends Document {
    parent: number;
    babysitter: string;
    number_working: number;
    expectations: string;  
  }
  
  export default IOrder
  
// import { generateUserPassword } from "../../helpers/bcrypt";
// import { handleBadRequest } from "../../utils/handleError";
// import { IBabysitter } from "../interface/BabysitterType";
// import IOrder from "../interface/orderType";
// import orderModel from "../models/BabysitterModel";

// const addOrder = async (dataorder: IOrder) => {
//   try {
//     if (
//       !dataorder.parent_id ||
//       !dataorder.babysitter_id ||
//       !dataorder.number_working 
//     ) {
//       throw new Error("One of the details is missing");
//     }
//     const newOrder = new BabysitterModel(dataBabysitter);
//     newBabysitter.password = generateUserPassword(newBabysitter.password);
//     await newBabysitter.save();
//     return newBabysitter;
//   } catch (error) {
//     return handleBadRequest("MongoDB", error);
//   }
// };

// const getAllOrders = async () => {
//   try {
//     const babysitters = await BabysitterModel.find();
//     return babysitters;
//   } catch (error: any) {
//     return handleBadRequest("MongoDB", error);
//   }
// };

// const getOrderById = async (babysitterId: string) => {
//   try {
//     const babysitter = await BabysitterModel.findById(babysitterId);
//     if (!babysitter) {
//       throw new Error("babysitter not found");
//     }
//     return babysitter;
//   } catch (error: any) {
//     return handleBadRequest("MongoDB", error);
//   }
// };

// const patchOrder = async (
//   babysitterId: string,
//   updateData: Partial<IBabysitter> 
// ) => {
//   try {
//     if (updateData.password) {
//       throw new Error("Password cannot be updated through this endpoint");
//     }

//     const existingBabysitter = await BabysitterModel.findById(babysitterId);
//     if (!existingBabysitter) {
//       throw new Error("babysitter not found");
//     }

//     const updatedBabysitter = await BabysitterModel.findByIdAndUpdate(
//       babysitterId,
//       {
//         ...updateData,
//         password: existingBabysitter.password,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     return updatedBabysitter;
//   } catch (error: any) {
//     return handleBadRequest("MongoDB", error);
//   }
// };

// const deleteOrder = async (babysitterId: string) => {
//   try {
//     const deletedBabysitter = await BabysitterModel.findByIdAndDelete(
//       babysitterId
//     );
//     if (!deletedBabysitter) {
//       throw new Error("babysitter not found");
//     }
//     return { message: "babysitter deleted successfully" };
//   } catch (error: any) {
//     return handleBadRequest("MongoDB", error);
//   }
// };

// export {
//     addOrder,
//     getAllOrders,
//     getOrderById,
//     patchOrder,
//     deleteOrder
// };
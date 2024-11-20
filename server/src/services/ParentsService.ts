import ParentsModel from "../models/ParentsModel";
import { handleBadRequest } from "../../utils/handleError";
import { IParents } from "../interface/parents";

const allParents = async () => {
  try {
    const allParents = await ParentsModel.find();
    if (!allParents) {
      throw new Error("The Parents list is empty");
    }
    return allParents;
  } catch (error: any) {
    error.status = 404;
    return handleBadRequest("MongoDB", error);
  }
};

// const addNewParents = async (parentsData: IParents) => {
//   try {
//     if (!parentsData.email || !parentsData.password) {
//       throw new Error("Missing required fields");
//     }

//     const newParent = new User(parentsData);
//     newParent.password = generateUserPassword(newParent.password);
//     await newParent.save();
//     return newParent;
//   } catch (error: any) {
//     return handleBadRequest("MongoDB", error);
//   }
// };

export { allParents, 
    // addNewParents 
};

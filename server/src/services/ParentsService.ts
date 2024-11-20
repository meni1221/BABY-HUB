import ParentsModel from "../models/ParentsModel";
import { handleBadRequest } from "../../utils/handleError";

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

export { allParents };

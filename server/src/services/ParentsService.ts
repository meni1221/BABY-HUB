import ParentsModel from "../models/ParentsModel";
import { handleBadRequest } from "../../utils/handleError";
import { IParents } from "../interface/parents";
import { generateUserPassword } from "../../helpers/bcrypt";

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

const addNewParents = async (parentsData: IParents) => {
  try {
    if (!parentsData.email || !parentsData.password) {
      throw new Error("Missing required fields");
    }
    const newParent = new ParentsModel(parentsData);
    newParent.password = generateUserPassword(newParent.password);
    await newParent.save();
    return newParent;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateParents = async (
  parentsId: string,
  updateData: Partial<IParents>
) => {
  try {
    if (updateData.password) {
      throw new Error("Password cannot be updated through this endpoint");
    }

    const existingParents = await ParentsModel.findById(parentsId);
    if (!existingParents) {
      throw new Error("Parents not found");
    }

    const updatedParents = await ParentsModel.findByIdAndUpdate(
      parentsId,
      {
        ...updateData,
        password: existingParents.password,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updateData;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { allParents, addNewParents, updateParents };

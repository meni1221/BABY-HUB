import { handleBadRequest } from "../../utils/handleError";
import  { IBabysitter } from "../interface/BabysitterType";
import BabysitterModel from "../models/BabysitterModel";

const addBabysitter = async (dataBabysitter: IBabysitter) => {
  try {
    if (
      !dataBabysitter.name ||
      !dataBabysitter.age ||
      !dataBabysitter.address ||
      !dataBabysitter.phone ||
      !dataBabysitter.email ||
      !dataBabysitter.price ||
      !dataBabysitter.password
    ) {
      throw new Error("One of the details is missing");
    }
    const newBabysitter = new BabysitterModel(dataBabysitter)
    // newBabysitter.password = generateUserPassword(newBabysitter.password);
    await newBabysitter.save();
    return newBabysitter;
  } catch (error) {
    return handleBadRequest("MongoDB", error);
  }
};

export{
    addBabysitter,
}



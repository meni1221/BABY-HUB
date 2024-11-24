import { generateUserPassword } from '../../helpers/bcrypt';
import { handleBadRequest } from '../../utils/handleError';
import { IBabysitter } from '../interface/BabysitterType';
import BabysitterModel from '../models/BabysitterModel';

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
      throw new Error('One of the details is missing');
    }
    const newBabysitter = new BabysitterModel(dataBabysitter);
    newBabysitter.password = generateUserPassword(newBabysitter.password);
    await newBabysitter.save();
    return newBabysitter;
  } catch (error) {
    return handleBadRequest('MongoDB', error);
  }
};

const getAllBabysitters = async () => {
  try {
    const babysitters = await BabysitterModel.find();
    return babysitters;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const getBabysitterById = async (babysitterId: string) => {
  try {
    const babysitter = await BabysitterModel.findById(babysitterId);
    if (!babysitter) {
      throw new Error('babysitter not found');
    }
    return babysitter;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const patchBabysitter = async (babysitterId: string, updateData: Partial<IBabysitter>) => {
  try {
    if (updateData.password) {
      throw new Error('Password cannot be updated through this endpoint');
    }

    const existingBabysitter = await BabysitterModel.findById(babysitterId);
    if (!existingBabysitter) {
      throw new Error('babysitter not found');
    }

    const updatedBabysitter = await BabysitterModel.findByIdAndUpdate(
      babysitterId,
      {
        ...updateData,
        password: existingBabysitter.password,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedBabysitter;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const deleteBabysitter = async (babysitterId: string) => {
  try {
    const deletedBabysitter = await BabysitterModel.findByIdAndDelete(babysitterId);
    if (!deletedBabysitter) {
      throw new Error('babysitter not found');
    }
    return { message: 'babysitter deleted successfully' };
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};

const addReviewToBabysitter = async (
  babysitterId: string,
  review: { userId: string; comment: string; rating: number }
) => {
  try {
    const babysitter = await BabysitterModel.findById(babysitterId);
    if (!babysitter) {
      throw new Error('Babysitter not found');
    }

    babysitter.reviews.push({
      ...review,
      createdAt: new Date(),
    });

    await babysitter.save();
    return babysitter;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};
const getBabysitterReviews = async (babysitterId: string) => {
  try {
    const babysitter = await BabysitterModel.findById(babysitterId).select('reviews');
    if (!babysitter) {
      throw new Error('Babysitter not found');
    }
    return babysitter.reviews;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};
const deleteReviewFromBabysitter = async (babysitterId: string, reviewId: string) => {
  try {
    const babysitter = await BabysitterModel.findById(babysitterId);
    if (!babysitter) {
      throw new Error('Babysitter not found');
    }

    babysitter.reviews = babysitter.reviews.filter(
      (review: any) => review._id.toString() !== reviewId
    );

    await babysitter.save();
    return babysitter;
  } catch (error: any) {
    return handleBadRequest('MongoDB', error);
  }
};
export {
  addBabysitter,
  getAllBabysitters,
  getBabysitterById,
  patchBabysitter,
  deleteBabysitter,
  addReviewToBabysitter,
  getBabysitterReviews,
  deleteReviewFromBabysitter,
};

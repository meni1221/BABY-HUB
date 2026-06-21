import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IBabysitter, IReview } from '../interface/BabysitterType';
import BabysitterModel from '../models/BabysitterModel';
import { generateUserPassword } from '../../helpers/bcrypt';

@Injectable()
export class BabysittersService {
  async create(data: IBabysitter) {
    if (!data.name || !data.age || !data.address || !data.phone || !data.email || !data.price || !data.password) {
      throw new BadRequestException('One of the details is missing');
    }

    const babysitter = new BabysitterModel(data);
    babysitter.password = generateUserPassword(babysitter.password);
    return babysitter.save();
  }

  async findAll() {
    return BabysitterModel.find();
  }

  async findOne(id: string) {
    const babysitter = await BabysitterModel.findById(id);

    if (!babysitter) {
      throw new NotFoundException('Babysitter not found');
    }

    return babysitter;
  }

  async update(id: string, data: Partial<IBabysitter>) {
    if (data.password) {
      throw new BadRequestException('Password cannot be updated through this endpoint');
    }

    const existingBabysitter = await this.findOne(id);
    const updatedBabysitter = await BabysitterModel.findByIdAndUpdate(
      id,
      {
        ...data,
        password: existingBabysitter.password,
      },
      { new: true, runValidators: true }
    );

    return updatedBabysitter;
  }

  async remove(id: string) {
    const deletedBabysitter = await BabysitterModel.findByIdAndDelete(id);

    if (!deletedBabysitter) {
      throw new NotFoundException('Babysitter not found');
    }

    return { message: 'Babysitter deleted successfully' };
  }

  async addReview(id: string, review: Omit<IReview, 'createdAt'>) {
    const babysitter = await this.findOne(id);

    babysitter.reviews.push({
      ...review,
      createdAt: new Date(),
    });

    await babysitter.save();
    return babysitter;
  }

  async getReviews(id: string) {
    const babysitter = await this.findOne(id);
    return babysitter.reviews;
  }

  async deleteReview(id: string, reviewId: string) {
    const babysitter = await this.findOne(id);
    babysitter.reviews = babysitter.reviews.filter(
      (review) => review._id?.toString() !== reviewId
    );

    await babysitter.save();
    return babysitter;
  }
}

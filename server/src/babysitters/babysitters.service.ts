import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { generateUserPassword } from '../../helpers/bcrypt';
import { logAndRethrow } from '../common/error-logger';
import { IBabysitter, IReview } from '../interface/BabysitterType';
import BabysitterModel from '../models/BabysitterModel';

@Injectable()
export class BabysittersService {
  private readonly logger = new Logger(BabysittersService.name);

  async create(data: IBabysitter) {
    try {
      this.logger.log(`INFO creating babysitter: ${data.email}`);

      if (
        !data.name ||
        !data.age ||
        !data.address ||
        !data.phone ||
        !data.email ||
        !data.price ||
        !data.password
      ) {
        this.logger.warn('WARN create babysitter failed: missing details');
        throw new BadRequestException('One of the details is missing');
      }

      const babysitter = new BabysitterModel(data);
      babysitter.password = generateUserPassword(babysitter.password);
      const savedBabysitter = await babysitter.save();

      this.logger.log(`INFO babysitter created: ${savedBabysitter._id}`);
      return savedBabysitter;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR create babysitter failed', error);
    }
  }

  async findAll() {
    try {
      this.logger.log('INFO fetching babysitters');
      const babysitters = await BabysitterModel.find();
      this.logger.log(`INFO fetched ${babysitters.length} babysitters`);
      return babysitters;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR fetch babysitters failed', error);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`INFO fetching babysitter: ${id}`);
      const babysitter = await BabysitterModel.findById(id);

      if (!babysitter) {
        this.logger.warn(`WARN babysitter not found: ${id}`);
        throw new NotFoundException('Babysitter not found');
      }

      return babysitter;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR fetch babysitter failed: ${id}`, error);
    }
  }

  async update(id: string, data: Partial<IBabysitter>) {
    try {
      this.logger.log(`INFO updating babysitter: ${id}`);

      if (data.password) {
        this.logger.warn(`WARN password update blocked for babysitter: ${id}`);
        throw new BadRequestException(
          'Password cannot be updated through this endpoint',
        );
      }

      const existingBabysitter = await this.findOne(id);
      if (!existingBabysitter) {
        throw new NotFoundException('Babysitter not found');
      }

      const updatedBabysitter = await BabysitterModel.findByIdAndUpdate(
        id,
        {
          ...data,
          password: existingBabysitter.password,
        },
        { new: true, runValidators: true },
      );

      this.logger.log(`INFO babysitter updated: ${id}`);
      return updatedBabysitter;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR update babysitter failed: ${id}`, error);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`INFO deleting babysitter: ${id}`);
      const deletedBabysitter = await BabysitterModel.findByIdAndDelete(id);

      if (!deletedBabysitter) {
        this.logger.warn(`WARN delete babysitter failed, not found: ${id}`);
        throw new NotFoundException('Babysitter not found');
      }

      this.logger.log(`INFO babysitter deleted: ${id}`);
      return { message: 'Babysitter deleted successfully' };
    } catch (error) {
      logAndRethrow(this.logger, `ERROR delete babysitter failed: ${id}`, error);
    }
  }

  async addReview(id: string, review: Omit<IReview, 'createdAt'>) {
    try {
      this.logger.log(`INFO adding review to babysitter: ${id}`);
      const babysitter = await this.findOne(id);
      if (!babysitter) {
        throw new NotFoundException('Babysitter not found');
      }

      babysitter.reviews.push({
        ...review,
        createdAt: new Date(),
      });

      await babysitter.save();
      this.logger.log(`INFO review added to babysitter: ${id}`);
      return babysitter;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR add review failed: ${id}`, error);
    }
  }

  async getReviews(id: string) {
    try {
      this.logger.log(`INFO fetching reviews for babysitter: ${id}`);
      const babysitter = await this.findOne(id);
      if (!babysitter) {
        throw new NotFoundException('Babysitter not found');
      }

      return babysitter.reviews;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR fetch reviews failed: ${id}`, error);
    }
  }

  async deleteReview(id: string, reviewId: string) {
    try {
      this.logger.log(`INFO deleting review ${reviewId} from babysitter: ${id}`);
      const babysitter = await this.findOne(id);
      if (!babysitter) {
        throw new NotFoundException('Babysitter not found');
      }

      const previousCount = babysitter.reviews.length;

      babysitter.reviews = babysitter.reviews.filter(
        (review) => review._id?.toString() !== reviewId,
      );

      if (babysitter.reviews.length === previousCount) {
        this.logger.warn(`WARN review not found: ${reviewId}`);
      }

      await babysitter.save();
      this.logger.log(`INFO review delete completed: ${reviewId}`);
      return babysitter;
    } catch (error) {
      logAndRethrow(
        this.logger,
        `ERROR delete review failed: ${id}/${reviewId}`,
        error,
      );
    }
  }
}

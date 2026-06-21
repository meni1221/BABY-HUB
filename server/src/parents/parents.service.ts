import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { generateUserPassword } from '../../helpers/bcrypt';
import { logAndRethrow } from '../common/error-logger';
import { IParents } from '../interface/parents';
import ParentsModel from '../models/ParentsModel';

@Injectable()
export class ParentsService {
  private readonly logger = new Logger(ParentsService.name);

  async findAll() {
    try {
      this.logger.log('INFO fetching parents');
      const parents = await ParentsModel.find();
      this.logger.log(`INFO fetched ${parents.length} parents`);
      return parents;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR fetch parents failed', error);
    }
  }

  async create(data: IParents) {
    try {
      this.logger.log(`INFO creating parent: ${data.email}`);

      if (!data.email || !data.password) {
        this.logger.warn('WARN create parent failed: missing required fields');
        throw new BadRequestException('Missing required fields');
      }

      const parent = new ParentsModel(data);
      parent.password = generateUserPassword(parent.password);
      const savedParent = await parent.save();

      this.logger.log(`INFO parent created: ${savedParent._id}`);
      return savedParent;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR create parent failed', error);
    }
  }

  async update(id: string, data: Partial<IParents>) {
    try {
      this.logger.log(`INFO updating parent: ${id}`);

      if (data.password) {
        this.logger.warn(`WARN password update blocked for parent: ${id}`);
        throw new BadRequestException(
          'Password cannot be updated through this endpoint',
        );
      }

      const existingParent = await ParentsModel.findById(id);

      if (!existingParent) {
        this.logger.warn(`WARN update parent failed, not found: ${id}`);
        throw new NotFoundException('Parent not found');
      }

      const updatedParent = await ParentsModel.findByIdAndUpdate(
        id,
        {
          ...data,
          password: existingParent.password,
        },
        { new: true, runValidators: true },
      );

      this.logger.log(`INFO parent updated: ${id}`);
      return updatedParent;
    } catch (error) {
      logAndRethrow(this.logger, `ERROR update parent failed: ${id}`, error);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`INFO deleting parent: ${id}`);
      const deletedParent = await ParentsModel.findByIdAndDelete(id);

      if (!deletedParent) {
        this.logger.warn(`WARN delete parent failed, not found: ${id}`);
        throw new NotFoundException('Parent not found');
      }

      this.logger.log(`INFO parent deleted: ${id}`);
      return { message: 'Parent deleted successfully' };
    } catch (error) {
      logAndRethrow(this.logger, `ERROR delete parent failed: ${id}`, error);
    }
  }
}

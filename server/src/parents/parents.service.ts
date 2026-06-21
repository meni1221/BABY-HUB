import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { generateUserPassword } from '../../helpers/bcrypt';
import { IParents } from '../interface/parents';
import ParentsModel from '../models/ParentsModel';

@Injectable()
export class ParentsService {
  async findAll() {
    return ParentsModel.find();
  }

  async create(data: IParents) {
    if (!data.email || !data.password) {
      throw new BadRequestException('Missing required fields');
    }

    const parent = new ParentsModel(data);
    parent.password = generateUserPassword(parent.password);
    return parent.save();
  }

  async update(id: string, data: Partial<IParents>) {
    if (data.password) {
      throw new BadRequestException('Password cannot be updated through this endpoint');
    }

    const existingParent = await ParentsModel.findById(id);

    if (!existingParent) {
      throw new NotFoundException('Parent not found');
    }

    return ParentsModel.findByIdAndUpdate(
      id,
      {
        ...data,
        password: existingParent.password,
      },
      { new: true, runValidators: true }
    );
  }

  async remove(id: string) {
    const deletedParent = await ParentsModel.findByIdAndDelete(id);

    if (!deletedParent) {
      throw new NotFoundException('Parent not found');
    }

    return { message: 'Parent deleted successfully' };
  }
}

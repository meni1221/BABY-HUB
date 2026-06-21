import { Logger } from '@nestjs/common';
import fs from 'fs';
import bcrypt from 'bcrypt';
import Parnts from '../models/ParentsModel';
import Babysitter from '../models/BabysitterModel';

interface SeedUser {
  password?: string;
  [key: string]: unknown;
}

const logger = new Logger('InitialData');

const encryptPasswords = async (userData: SeedUser[]) => {
  return Promise.all(
    userData.map(async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
      return user;
    }),
  );
};

const readSeedFile = (path: string): SeedUser[] => {
  try {
    logger.log(`INFO loading seed file: ${path}`);
    return JSON.parse(fs.readFileSync(path, 'utf8')) as SeedUser[];
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));
    logger.error(`ERROR failed to load seed file: ${path}`, normalizedError.stack);
    throw error;
  }
};

const loadInitialData = async () => {
  try {
    const userData = readSeedFile('./data/parnts.json');
    const babySitterData = readSeedFile('./data/babySitter.json');

    if ((await Parnts.countDocuments()) === 0) {
      const encryptedUserData = await encryptPasswords(userData);
      await Parnts.insertMany(encryptedUserData);
      logger.log('INFO initial parents have been added to the database');
    } else {
      logger.warn('WARN parents seed skipped: data already exists');
    }

    if ((await Babysitter.countDocuments()) === 0) {
      const encryptedBabySitterData = await encryptPasswords(babySitterData);
      await Babysitter.insertMany(encryptedBabySitterData);
      logger.log('INFO initial babysitters have been added to the database');
    } else {
      logger.warn('WARN babysitters seed skipped: data already exists');
    }
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));
    logger.error('ERROR failed to load initial data', normalizedError.stack);
    throw error;
  }
};

export default loadInitialData;

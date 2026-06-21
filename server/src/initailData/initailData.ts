import fs from 'fs';
import bcrypt from 'bcrypt';
import Parnts from '../models/ParentsModel';
import Babysitter from '../models/BabysitterModel';

interface SeedUser {
  password?: string;
  [key: string]: unknown;
}

const encryptPasswords = async (userData: SeedUser[]) => {
  return Promise.all(
    userData.map(async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
      return user;
    })
  );
};

const loadInitialData = async () => {
  const userData = JSON.parse(fs.readFileSync('./data/parnts.json', 'utf8')) as SeedUser[];
  const babySitterData = JSON.parse(
    fs.readFileSync('./data/babySitter.json', 'utf8')
  ) as SeedUser[];

  if ((await Parnts.countDocuments()) === 0) {
    const encryptedUserData = await encryptPasswords(userData);
    await Parnts.insertMany(encryptedUserData);
    console.log('Initial parents have been added to the database.');
  } else {
    console.log('Parents already exist in the database.');
  }
  if ((await Babysitter.countDocuments()) === 0) {
    const encryptedBabySitterData = await encryptPasswords(babySitterData);
    await Babysitter.insertMany(encryptedBabySitterData);
    console.log('Initial babysitters have been added to the database.');
  } else {
    console.log('Babysitters already exist in the database.');
  }
};

export default loadInitialData;

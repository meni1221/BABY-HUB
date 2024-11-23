import { CookieOptions, Request, Response } from 'express';
import { handleBadRequest } from '../../utils/handleError';
import ParentsSchema from '../models/ParentsModel';
import { comparePassword } from '../../helpers/bcrypt';
import { generateAuthToken } from '../../helpers/jwt';

const cookieConfing: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
};

interface UserDTO {
  email: string;
  password: string;
}

interface Parent {
  email: string;
  password: string;
}

// Login the baybsitter
const loginBabySitter = async (user: Parent, res: Response) => {
  try {
    if (!user.email || !user.password) {
      throw new Error('Missing required fields✍️');
    }

    const findUser = await ParentsSchema.findOne({ email: user.email });
    if (!findUser) {
      throw new Error('Could not find this user in the database🔍❌');
    }

    const isPasswordCorrect = await comparePassword(
      user.password,
      findUser.password,
    );
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password or Email✍️');
    }

    const { _id, isAdmin } = findUser;
    let token = generateAuthToken({ _id, isAdmin });

    if (!cookieConfing) {
      throw new Error('Cookie configuration is missing🍪');
    }
    res.cookie('auth_token', token, cookieConfing);
    return { findUser, token };
  } catch (error: any) {
    error.status = 400;
    return handleBadRequest('MongoDN', error);
  }
};

// Login the parents
const loginParent = async (user: UserDTO, res: Response) => {
  try {
    if (!user.email || !user.password) {
      throw new Error('Missing required fields✍️');
    }

    const findUser = await ParentsSchema.findOne({ email: user.email });
    if (!findUser) {
      throw new Error('Could not find this user in the database🔍❌');
    }

    const isPasswordCorrect = await comparePassword(
      user.password,
      findUser.password,
    );
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password or Email✍️');
    }

    const { _id, isAdmin } = findUser;
    let token = generateAuthToken({ _id, isAdmin });

    if (!cookieConfing) {
      throw new Error('Cookie configuration is missing🍪');
    }
    res.cookie('auth_token', token, cookieConfing);
    return { findUser, token };
  } catch (error: any) {
    error.status = 400;
    return handleBadRequest('MongoDB', error);
  }
};

// Logout in all the users
const logout = (res: Response) => {
  try {
    res.clearCookie('auth_token', cookieConfing);
    console.log('User logged out and cookie cleared👋');
  } catch (error: any) {
    error.status = 500;
    handleBadRequest('Logout error😥', error);
  }
};

export { loginBabySitter, loginParent, logout };

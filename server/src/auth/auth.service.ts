import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../../helpers/bcrypt';
import { generateAuthToken } from '../../helpers/jwt';
import BabysitterModel from '../models/BabysitterModel';
import ParentsModel from '../models/ParentsModel';

interface LoginDto {
  email: string;
  password: string;
}

interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
};

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';

@Injectable()
export class AuthService {
  async loginBabysitter(user: LoginDto, res: Response) {
    if (!user.email || !user.password) {
      throw new UnauthorizedException('Missing required fields');
    }

    const foundUser = await BabysitterModel.findOne({ email: user.email });

    if (!foundUser || !comparePassword(user.password, foundUser.password)) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const token = generateAuthToken({ _id: foundUser._id, isAdmin: false });
    res.cookie('auth_token', token, cookieConfig);

    return { foundUser, token };
  }

  async loginParent(user: LoginDto, res: Response) {
    if (!user.email || !user.password) {
      throw new UnauthorizedException('Missing required fields');
    }

    const foundUser = await ParentsModel.findOne({ email: user.email });

    if (!foundUser || !comparePassword(user.password, foundUser.password)) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const token = generateAuthToken({
      _id: foundUser._id,
      isAdmin: Boolean(foundUser.isAdmin),
    });
    res.cookie('auth_token', token, cookieConfig);

    return { foundUser, token };
  }

  logout(res: Response) {
    res.clearCookie('auth_token', cookieConfig);
    return { message: 'Logged out successfully' };
  }

  async verifyUser(token: string | undefined, role: string) {
    if (!token) {
      throw new UnauthorizedException('Access denied. No token provided');
    }

    const decoded = jwt.verify(token, secretKey, {
      algorithms: ['HS256'],
    }) as TokenPayload;

    if (role === 'parent') {
      return ParentsModel.findById(decoded.id);
    }

    return BabysitterModel.findById(decoded.id);
  }
}

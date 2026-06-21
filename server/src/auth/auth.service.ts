import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../../helpers/bcrypt';
import { generateAuthToken } from '../../helpers/jwt';
import { logAndRethrow } from '../common/error-logger';
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
  private readonly logger = new Logger(AuthService.name);

  async loginBabysitter(user: LoginDto, res: Response) {
    try {
      this.logger.log(`INFO login babysitter request: ${user.email}`);

      if (!user.email || !user.password) {
        this.logger.warn('WARN babysitter login failed: missing fields');
        throw new UnauthorizedException('Missing required fields');
      }

      const foundUser = await BabysitterModel.findOne({ email: user.email });

      if (!foundUser || !comparePassword(user.password, foundUser.password)) {
        this.logger.warn(`WARN babysitter login failed: ${user.email}`);
        throw new UnauthorizedException('Incorrect email or password');
      }

      const token = generateAuthToken({ _id: foundUser._id, isAdmin: false });
      res.cookie('auth_token', token, cookieConfig);

      this.logger.log(`INFO babysitter logged in: ${foundUser._id}`);
      return { foundUser, token };
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR babysitter login failed', error);
    }
  }

  async loginParent(user: LoginDto, res: Response) {
    try {
      this.logger.log(`INFO parent login request: ${user.email}`);

      if (!user.email || !user.password) {
        this.logger.warn('WARN parent login failed: missing fields');
        throw new UnauthorizedException('Missing required fields');
      }

      const foundUser = await ParentsModel.findOne({ email: user.email });

      if (!foundUser || !comparePassword(user.password, foundUser.password)) {
        this.logger.warn(`WARN parent login failed: ${user.email}`);
        throw new UnauthorizedException('Incorrect email or password');
      }

      const token = generateAuthToken({
        _id: foundUser._id,
        isAdmin: Boolean(foundUser.isAdmin),
      });
      res.cookie('auth_token', token, cookieConfig);

      this.logger.log(`INFO parent logged in: ${foundUser._id}`);
      return { foundUser, token };
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR parent login failed', error);
    }
  }

  logout(res: Response) {
    try {
      res.clearCookie('auth_token', cookieConfig);
      this.logger.log('INFO user logged out');
      return { message: 'Logged out successfully' };
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR logout failed', error);
    }
  }

  async verifyUser(token: string | undefined, role: string) {
    try {
      this.logger.log(`INFO verify user request for role: ${role}`);

      if (!token) {
        this.logger.warn('WARN verify user failed: missing token');
        throw new UnauthorizedException('Access denied. No token provided');
      }

      const decoded = jwt.verify(token, secretKey, {
        algorithms: ['HS256'],
      }) as TokenPayload;

      const user =
        role === 'parent'
          ? await ParentsModel.findById(decoded.id)
          : await BabysitterModel.findById(decoded.id);

      if (!user) {
        this.logger.warn(`WARN verify user failed: user not found ${decoded.id}`);
      } else {
        this.logger.log(`INFO user verified: ${decoded.id}`);
      }

      return user;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR verify user failed', error);
    }
  }
}

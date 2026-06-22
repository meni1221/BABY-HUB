import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { comparePassword, generateUserPassword } from '../../helpers/bcrypt';
import { generateAuthToken, getJwtSecret } from '../../helpers/jwt';
import { logAndRethrow } from '../common/error-logger';
import BabysitterModel from '../models/BabysitterModel';
import ParentsModel from '../models/ParentsModel';
import { MailService } from './mail.service';

interface LoginDto {
  email: string;
  password: string;
}

interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

interface PasswordResetRequest {
  email: string;
  role: 'babysitter' | 'parent';
}

interface PasswordResetConfirm {
  password: string;
  token: string;
}

interface LoginAttempt {
  count: number;
  resetAt: number;
}

const cookieConfig: CookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 1000,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const PASSWORD_RESET_EXPIRES_MS = 15 * 60 * 1000;
const PASSWORD_RESET_RESPONSE = {
  message: 'If the email exists, a password reset link was sent',
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly loginAttempts = new Map<string, LoginAttempt>();

  constructor(private readonly mailService: MailService) {}

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private assertLoginAllowed(email: string) {
    const now = Date.now();
    const attempt = this.loginAttempts.get(email);

    if (!attempt || attempt.resetAt <= now) {
      this.loginAttempts.set(email, {
        count: 0,
        resetAt: now + LOGIN_ATTEMPT_WINDOW_MS,
      });
      return;
    }

    if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
      this.logger.warn(`WARN login rate limited: ${email}`);
      throw new UnauthorizedException('Too many login attempts');
    }
  }

  private recordFailedLogin(email: string) {
    const now = Date.now();
    const attempt = this.loginAttempts.get(email);

    if (!attempt || attempt.resetAt <= now) {
      this.loginAttempts.set(email, {
        count: 1,
        resetAt: now + LOGIN_ATTEMPT_WINDOW_MS,
      });
      return;
    }

    attempt.count += 1;
    this.loginAttempts.set(email, attempt);
  }

  private clearLoginAttempts(email: string) {
    this.loginAttempts.delete(email);
  }

  async loginBabysitter(user: LoginDto, res: Response) {
    try {
      if (!user.email || !user.password) {
        this.logger.warn('WARN babysitter login failed: missing fields');
        throw new UnauthorizedException('Missing required fields');
      }

      const email = this.normalizeEmail(user.email);
      this.assertLoginAllowed(email);
      this.logger.log(`INFO login babysitter request: ${email}`);

      const foundUser = await BabysitterModel.findOne({ email });

      if (!foundUser || !comparePassword(user.password, foundUser.password)) {
        this.recordFailedLogin(email);
        this.logger.warn(`WARN babysitter login failed: ${email}`);
        throw new UnauthorizedException('Incorrect email or password');
      }

      this.clearLoginAttempts(email);
      const token = generateAuthToken({ _id: foundUser._id, isAdmin: false });
      res.cookie('auth_token', token, cookieConfig);

      this.logger.log(`INFO babysitter logged in: ${foundUser._id}`);
      return { foundUser };
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR babysitter login failed', error);
    }
  }

  async loginParent(user: LoginDto, res: Response) {
    try {
      if (!user.email || !user.password) {
        this.logger.warn('WARN parent login failed: missing fields');
        throw new UnauthorizedException('Missing required fields');
      }

      const email = this.normalizeEmail(user.email);
      this.assertLoginAllowed(email);
      this.logger.log(`INFO parent login request: ${email}`);

      const foundUser = await ParentsModel.findOne({ email });

      if (!foundUser || !comparePassword(user.password, foundUser.password)) {
        this.recordFailedLogin(email);
        this.logger.warn(`WARN parent login failed: ${email}`);
        throw new UnauthorizedException('Incorrect email or password');
      }

      this.clearLoginAttempts(email);
      const token = generateAuthToken({
        _id: foundUser._id,
        isAdmin: Boolean(foundUser.isAdmin),
      });
      res.cookie('auth_token', token, cookieConfig);

      this.logger.log(`INFO parent logged in: ${foundUser._id}`);
      return { foundUser };
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

  async requestPasswordReset({ email, role }: PasswordResetRequest) {
    try {
      if (!email || (role !== 'parent' && role !== 'babysitter')) {
        this.logger.warn('WARN password reset request failed: invalid payload');
        return PASSWORD_RESET_RESPONSE;
      }

      const normalizedEmail = this.normalizeEmail(email);
      const user =
        role === 'parent'
          ? await ParentsModel.findOne({ email: normalizedEmail })
          : await BabysitterModel.findOne({ email: normalizedEmail });

      if (!user) {
        this.logger.warn(`WARN password reset requested for unknown user: ${role}`);
        return PASSWORD_RESET_RESPONSE;
      }

      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = this.hashPasswordResetToken(rawToken);

      user.passwordResetToken = hashedToken;
      user.passwordResetExpires = new Date(Date.now() + PASSWORD_RESET_EXPIRES_MS);
      await user.save();

      const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
      const resetUrl = `${clientOrigin}/reset-password?token=${rawToken}`;

      await this.mailService.sendPasswordResetEmail({
        email: normalizedEmail,
        resetUrl,
      });

      this.logger.log(`INFO password reset requested: ${role}/${user._id}`);
      return PASSWORD_RESET_RESPONSE;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR password reset request failed', error);
    }
  }

  async resetPassword({ password, token }: PasswordResetConfirm) {
    try {
      if (!password || password.length < 8 || !token) {
        this.logger.warn('WARN password reset confirm failed: invalid payload');
        throw new UnauthorizedException('Invalid password reset request');
      }

      const hashedToken = this.hashPasswordResetToken(token);
      const query = {
        passwordResetExpires: { $gt: new Date() },
        passwordResetToken: hashedToken,
      };

      const user =
        (await ParentsModel.findOne(query)) || (await BabysitterModel.findOne(query));

      if (!user) {
        this.logger.warn('WARN password reset confirm failed: token invalid');
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      user.password = generateUserPassword(password);
      user.passwordResetExpires = undefined;
      user.passwordResetToken = undefined;
      await user.save();

      this.logger.log(`INFO password reset completed: ${user._id}`);
      return { message: 'Password reset successfully' };
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR password reset confirm failed', error);
    }
  }

  async verifyUser(token: string | undefined, role: string) {
    try {
      this.logger.log(`INFO verify user request for role: ${role}`);

      if (!token) {
        this.logger.warn('WARN verify user failed: missing token');
        throw new UnauthorizedException('Access denied. No token provided');
      }

      if (role !== 'parent' && role !== 'babysitter') {
        this.logger.warn(`WARN verify user failed: invalid role ${role}`);
        throw new UnauthorizedException('Invalid role');
      }

      const decoded = jwt.verify(token, getJwtSecret(), {
        algorithms: ['HS256'],
      }) as TokenPayload;

      const user =
        role === 'parent'
          ? await ParentsModel.findById(decoded.id)
          : await BabysitterModel.findById(decoded.id);

      if (!user) {
        this.logger.warn(`WARN verify user failed: user not found ${decoded.id}`);
        throw new UnauthorizedException('Invalid session');
      }

      this.logger.log(`INFO user verified: ${decoded.id}`);
      return user;
    } catch (error) {
      logAndRethrow(this.logger, 'ERROR verify user failed', error);
    }
  }

  private hashPasswordResetToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

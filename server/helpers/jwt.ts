import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Parent from '../src/models/ParentsModel';
import Babysitter from '../src/models/BabysitterModel';

interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key';

const generateAuthToken = (user: { _id: any; isAdmin: boolean }): string => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECRET_KEY, {
    expiresIn: '1h',
  });
};

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  // בודק האם יש קוקיס בהאדר
  if (!req.headers.cookie) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No cookies provided😔',
    });
  }

  const token = req.cookies['auth_token'];

  // בודק האם נמצא קוקיס עם שם מסויים
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided😔',
    });
  }
  try {
    // מנסה לקודד ולמצוא האם הטוקן נכון ואמיתי
    const decoded = jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256'],
    }) as TokenPayload;
    (req as any).user = decoded;

    // במידה והכל הצליח הוא מעביר לקונטרולר
    next();
    // אם יש שגיאה הוא תופס אותה
  } catch (error) {
    console.error('Token verification error😖', error);
    // בודק האם הטוקן עדיין בתוקף ולא עבר זמנו
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please log in again🤞',
      });
    }
    // בודק האם התוקן ונלידי ולא השתנה
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or malformed token🫤',
      });
    }
  }
};
const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyUser(req, res, () => {
    const user = (req as any).user;

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Admin privileges required🛑',
      });
    }
    next();
  });
};
const verifyUserForLogin = async (req: Request, res: Response, role: any) => {
  if (!req.headers.cookie) {
    return {
      status: 'error',
      message: 'Access denied. No cookies provided😔',
    };
  }

  const token = req.cookies['auth_token'];

  if (!token) {
    return {
      status: 'error',
      message: 'Access denied. No token provided😔',
    };
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256'],
    }) as TokenPayload;
    // ---------הבדיקה שאני עושה בשביל לדעת על איזה DB לרוץ ---------

    if (role === 'parent') {
      const parent = await Parent.findById(decoded.id);
      return parent;
    } else {
      const baby = await Babysitter.findById(decoded.id);
      return baby;
    }

    // --------עד כאן הבדיקה--------
  } catch (error) {
    console.error('Token verification error😖', error);

    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: 'error',
        message: 'Token expired. Please log in again🤞',
      };
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return {
        status: 'error',
        message: 'Invalid or malformed token🫤',
      };
    }

    return {
      status: 'error',
      message: 'Internal error during authentication🤔',
    };
  }
};
export { generateAuthToken, verifyUser, verifyAdmin, verifyUserForLogin };

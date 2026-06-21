import jwt from 'jsonwebtoken';

interface TokenUser {
  _id: string | { toString: () => string };
  isAdmin: boolean;
}

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';

const generateAuthToken = (user: TokenUser): string => {
  return jwt.sign(
    {
      id: user._id.toString(),
      isAdmin: user.isAdmin,
    },
    secretKey,
    {
      expiresIn: '1h',
    }
  );
};

export { generateAuthToken };

import jwt from 'jsonwebtoken';

interface TokenUser {
  _id: string | { toString: () => string };
  isAdmin: boolean;
}

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  return secret;
};

const generateAuthToken = (user: TokenUser): string => {
  return jwt.sign(
    {
      id: user._id.toString(),
      isAdmin: user.isAdmin,
    },
    getJwtSecret(),
    {
      expiresIn: '1h',
    }
  );
};

export { generateAuthToken, getJwtSecret };

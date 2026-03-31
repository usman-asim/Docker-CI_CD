import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(payload.userId).select('_id');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user.id };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

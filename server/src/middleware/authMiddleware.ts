import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Augment Express Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: unknown;
    }
  }
}

// Middleware: Protect routes using JWT Bearer token
export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = (req.headers['authorization'] || req.headers['Authorization']) as string | undefined;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = header.slice('Bearer '.length).trim();
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

    const decoded = jwt.verify(token, secret);
    // Attach payload to req.user (supports string or object payloads)
    req.user = typeof decoded === 'string' ? { token: decoded } : (decoded as JwtPayload);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

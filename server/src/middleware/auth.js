import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const requireAdmin = (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    const error = new Error('Admin authentication required');
    error.status = 401;
    return next(error);
  }

  try {
    req.admin = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    const error = new Error('Invalid or expired admin token');
    error.status = 401;
    return next(error);
  }
};

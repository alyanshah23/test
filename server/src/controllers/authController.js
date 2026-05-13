import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const login = async (req, res) => {
  const { email, password } = req.validated.body;
  const emailMatches = email.toLowerCase() === env.adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(password, await bcrypt.hash(env.adminPassword, 10));

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ role: 'admin', email: env.adminEmail }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return res.json({ token, admin: { email: env.adminEmail } });
};

import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { loginSchema } from './schemas.js';

export const authRouter = Router();

authRouter.post('/login', validate(loginSchema), asyncHandler(login));

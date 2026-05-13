import { Router } from 'express';
import { createMenuItem, deleteMenuItem, getMenu, updateMenuItem } from '../controllers/menuController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { menuItemSchema, menuItemWithIdSchema, menuQuerySchema } from './schemas.js';

export const menuRouter = Router();

menuRouter.get('/', validate(menuQuerySchema), asyncHandler(getMenu));
menuRouter.post('/', requireAdmin, validate(menuItemSchema), asyncHandler(createMenuItem));
menuRouter.put('/:id', requireAdmin, validate(menuItemWithIdSchema), asyncHandler(updateMenuItem));
menuRouter.delete('/:id', requireAdmin, validate(menuItemWithIdSchema.pick({ params: true })), asyncHandler(deleteMenuItem));

import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { orderSchema, orderStatusSchema } from './schemas.js';

export const orderRouter = Router();

orderRouter.post('/', validate(orderSchema), asyncHandler(createOrder));
orderRouter.get('/', requireAdmin, asyncHandler(getOrders));
orderRouter.patch('/:id', requireAdmin, validate(orderStatusSchema), asyncHandler(updateOrderStatus));

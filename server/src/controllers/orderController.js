import { query } from '../config/db.js';
import { OrderModel } from '../models/orderModel.js';

const toCurrencyNumber = (value) => Number(Number(value).toFixed(2));

const enrichAndValidateItems = async (cartItems, submittedTotal) => {
  const ids = cartItems.map((item) => item.id);
  const { rows } = await query(
    'SELECT id, name, price, image_url FROM menu_items WHERE id = ANY($1::uuid[])',
    [ids],
  );
  const menuById = new Map(rows.map((row) => [row.id, row]));

  if (menuById.size !== ids.length) {
    const error = new Error('One or more cart items are no longer available');
    error.status = 400;
    throw error;
  }

  const items = cartItems.map((item) => {
    const menuItem = menuById.get(item.id);
    return {
      id: menuItem.id,
      name: menuItem.name,
      price: Number(menuItem.price),
      quantity: item.quantity,
      image_url: menuItem.image_url,
    };
  });
  const total = toCurrencyNumber(items.reduce((sum, item) => sum + item.price * item.quantity, 0));

  if (Math.abs(total - toCurrencyNumber(submittedTotal)) > 0.01) {
    const error = new Error('Cart total does not match current menu prices');
    error.status = 400;
    throw error;
  }

  return { items, total };
};

export const createOrder = async (req, res) => {
  const { items, total } = await enrichAndValidateItems(req.validated.body.items, req.validated.body.total_price);
  const order = await OrderModel.create({ ...req.validated.body, items, total_price: total });
  res.status(201).json(order);
};

export const getOrders = async (_req, res) => {
  const orders = await OrderModel.findAll();
  res.json(orders);
};

export const updateOrderStatus = async (req, res, next) => {
  const order = await OrderModel.updateStatus(req.validated.params.id, req.validated.body.status);
  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    return next(error);
  }
  return res.json(order);
};

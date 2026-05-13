import { MenuModel } from '../models/menuModel.js';

export const getMenu = async (req, res) => {
  const menu = await MenuModel.findAll(req.validated?.query || req.query);
  res.json(menu);
};

export const createMenuItem = async (req, res) => {
  const item = await MenuModel.create(req.validated.body);
  res.status(201).json(item);
};

export const updateMenuItem = async (req, res, next) => {
  const item = await MenuModel.update(req.validated.params.id, req.validated.body);
  if (!item) {
    const error = new Error('Menu item not found');
    error.status = 404;
    return next(error);
  }
  return res.json(item);
};

export const deleteMenuItem = async (req, res, next) => {
  const deleted = await MenuModel.remove(req.validated.params.id);
  if (!deleted) {
    const error = new Error('Menu item not found');
    error.status = 404;
    return next(error);
  }
  return res.status(204).send();
};

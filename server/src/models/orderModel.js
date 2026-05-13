import { query } from '../config/db.js';

const mapOrder = (row) => ({
  ...row,
  total_price: Number(row.total_price),
});

export const OrderModel = {
  async create(order) {
    const { rows } = await query(
      `INSERT INTO orders (customer_name, phone, address, notes, items, total_price)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6)
       RETURNING id, customer_name, phone, address, notes, items, total_price, status, created_at, updated_at`,
      [
        order.customer_name,
        order.phone,
        order.address,
        order.notes || '',
        JSON.stringify(order.items),
        order.total_price,
      ],
    );
    return mapOrder(rows[0]);
  },

  async findAll() {
    const { rows } = await query(
      `SELECT id, customer_name, phone, address, notes, items, total_price, status, created_at, updated_at
       FROM orders ORDER BY created_at DESC`,
    );
    return rows.map(mapOrder);
  },

  async updateStatus(id, status) {
    const { rows } = await query(
      `UPDATE orders SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, customer_name, phone, address, notes, items, total_price, status, created_at, updated_at`,
      [status, id],
    );
    return rows[0] ? mapOrder(rows[0]) : null;
  },
};

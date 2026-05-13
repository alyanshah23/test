import { query } from '../config/db.js';

const mapMenuItem = (row) => ({
  ...row,
  price: Number(row.price),
});

export const MenuModel = {
  async findAll({ search = '', category = '' } = {}) {
    const filters = [];
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      filters.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }

    if (category) {
      params.push(category);
      filters.push(`category = $${params.length}`);
    }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const { rows } = await query(
      `SELECT id, name, description, price, image_url, category, created_at, updated_at
       FROM menu_items ${where} ORDER BY category, name`,
      params,
    );
    return rows.map(mapMenuItem);
  },

  async create(item) {
    const { rows } = await query(
      `INSERT INTO menu_items (name, description, price, image_url, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, price, image_url, category, created_at, updated_at`,
      [item.name, item.description, item.price, item.image_url, item.category || 'Biryani'],
    );
    return mapMenuItem(rows[0]);
  },

  async update(id, item) {
    const { rows } = await query(
      `UPDATE menu_items
       SET name = $1, description = $2, price = $3, image_url = $4, category = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING id, name, description, price, image_url, category, created_at, updated_at`,
      [item.name, item.description, item.price, item.image_url, item.category || 'Biryani', id],
    );
    return rows[0] ? mapMenuItem(rows[0]) : null;
  },

  async remove(id) {
    const { rowCount } = await query('DELETE FROM menu_items WHERE id = $1', [id]);
    return rowCount > 0;
  },
};

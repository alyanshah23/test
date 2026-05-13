import { pool } from '../config/db.js';

const items = [
  ['Hyderabadi Chicken Dum Biryani', 'Aromatic basmati rice layered with tender chicken, saffron, mint, and fried onions.', 13.99, 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80', 'Chicken'],
  ['Royal Mutton Biryani', 'Slow-cooked mutton with warming spices, long-grain rice, and house-made raita.', 16.99, 'https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?auto=format&fit=crop&w=900&q=80', 'Mutton'],
  ['Paneer Tikka Biryani', 'Smoky paneer tikka, bell peppers, fragrant rice, and creamy biryani masala.', 12.49, 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=900&q=80', 'Vegetarian'],
  ['Egg Biryani', 'Boiled eggs simmered in masala and layered with fluffy basmati rice.', 10.99, 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=900&q=80', 'Egg'],
];

for (const item of items) {
  await pool.query(
    `INSERT INTO menu_items (name, description, price, image_url, category)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT DO NOTHING`,
    item,
  );
}

await pool.end();
console.log('Seed menu items inserted.');

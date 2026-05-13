# Biryani Bliss Ordering Website

A complete full-stack single-page biryani ordering application with a React/Vite/Tailwind customer experience, Express REST API, PostgreSQL persistence, and JWT-protected admin dashboard.

## Features

### Customer website
- Responsive restaurant landing page with menu, search, category filters, loading skeletons, and toast notifications.
- Add-to-cart drawer with quantity updates, item removal, and live total calculation.
- Checkout form for customer name, phone, address, and notes.
- Order confirmation message after the order is saved.

### Admin panel (`/admin`)
- JWT admin login.
- Dashboard analytics for total orders, revenue, and preparing orders.
- Order list with status updates: `pending`, `preparing`, and `delivered`.
- Menu management to add, edit, and delete menu items.

### Backend API
- `POST /auth/login` — admin login.
- `GET /menu` — fetch menu items, with optional `search` and `category` query params.
- `POST /menu` — add menu item; admin only.
- `PUT /menu/:id` — update menu item; admin only.
- `DELETE /menu/:id` — delete menu item; admin only.
- `POST /orders` — place order.
- `GET /orders` — list all orders; admin only.
- `PATCH /orders/:id` — update order status; admin only.

## Tech stack

- Frontend: React, Vite, Tailwind CSS, React Router, React Hot Toast.
- Backend: Node.js, Express.js, Zod validation, JWT auth, Helmet, CORS, rate limiting.
- Database: PostgreSQL with JSONB cart items.

## Project structure

```text
client/                React/Vite frontend
server/                Express API
server/db/schema.sql   PostgreSQL schema
server/src/models      Database access layer
server/src/controllers Request handlers
server/src/routes      REST routes and validation schemas
```

## Prerequisites

- Node.js 20+
- PostgreSQL 14+

## Setup

1. Install dependencies:

   ```bash
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

2. Create a PostgreSQL database:

   ```bash
   createdb biryani_orders
   ```

3. Configure environment variables:

   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

   Update `server/.env` with your PostgreSQL connection string and a strong `JWT_SECRET`.

4. Create tables and seed starter menu data:

   ```bash
   npm run db:setup
   npm run db:seed
   ```

5. Start the full stack in development:

   ```bash
   npm run dev
   ```

6. Open the customer app at `http://localhost:5173` and the admin login at `http://localhost:5173/admin`.

## Production notes

- Set `NODE_ENV=production` and provide a production `DATABASE_URL`.
- Use a long random `JWT_SECRET`.
- Set `CLIENT_ORIGIN` to your deployed frontend URL.
- Run `npm run build` to produce the frontend bundle.
- Serve the backend with `npm start --prefix server` behind a reverse proxy or platform load balancer.

## Useful commands

```bash
npm run dev       # run API and frontend concurrently
npm run build     # build frontend
npm run lint      # lint client and server
npm run db:setup  # apply schema
npm run db:seed   # insert starter menu items
```

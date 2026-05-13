import { app } from './app.js';
import { pool } from './config/db.js';
import { env } from './config/env.js';

const server = app.listen(env.port, () => {
  console.log(`Biryani API running on port ${env.port}`);
});

const shutdown = async () => {
  console.log('Shutting down API...');
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm-pg';

const pool = new Pool({
  host: 'ep-mute-cake-a44fzubt-pooler.us-east-1.aws.neon.tech',
  user: 'default',
  password: 'SVe9tNDQbGT8',
  database: 'verceldb',
  port: 5432, // Porta padrão do PostgreSQL
});
      
export const db = drizzle(pool);
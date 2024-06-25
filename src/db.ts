import { Pool } from 'pg';

const pool = new Pool({
  host: 'ep-mute-cake-a44fzubt-pooler.us-east-1.aws.neon.tech',
  user: 'default',
  password: 'SVe9tNDQbGT8',
  database: 'verceldb',
  port: 5432, // Porta padrão do PostgreSQL
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

pool.on('connect', () => {
  console.log('Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro no banco de dados:', err);
  process.exit(-1);
});
import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

console.log('USING DB:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // wajib untuk Supabase
  },
});

// const pool = new Pool({
//   host: 'db.qjflbyjvnchiorlzewqp.supabase.co',
//   port: 5432,
//   database: 'postgres',
//   user: 'postgres',
//   password: 'Adakah100?*', // You can use the raw password here!
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

export default pool;

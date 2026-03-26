import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env.dev',
  quiet: true
});
// Load env based on TEST_ENV
const envFile = `.env.${process.env.TEST_ENV || 'dev'}`;
dotenv.config({ path: envFile });

// Fail fast
if (!process.env.BASE_URL) throw new Error('BASE_URL missing');
if (!process.env.USER) throw new Error('USER missing');
if (!process.env.PASSWORD) throw new Error('PASSWORD missing');

export const ENV = {
  baseURL: process.env.BASE_URL,
  user: process.env.USER,
  password: process.env.PASSWORD,
};
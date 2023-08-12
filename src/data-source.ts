import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

const USER = process.env.POSTGRES_USER || 'root';
const PASS = process.env.POSTGRES_PASSWORD || 'rootroot';
const DB = process.env.POSTGRES_DB || 'database';
const PORT = Number(process.env.POSTGRES_PORT) || 5432;
const HOST = process.env.POSTGRES_HOST || 'localhost';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: HOST,
  port: PORT,
  username: USER,
  password: PASS,
  database: DB,
  synchronize: false,
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
});

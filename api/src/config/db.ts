
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaBetterSqlite3({
  // url: "file:./dev.db"
  url: process.env.DATABASE_URL
})
const prisma = new PrismaClient({ adapter })

export default prisma;
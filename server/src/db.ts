import dotenv from 'dotenv';
dotenv.config();

// --- PostgreSQL Configuration (Prisma) ---
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export const connectDB = async () => {
  try {
    await db.$connect();
    console.log('✅ PostgreSQL (Prisma) Connected');
  } catch (error) {
    console.error('❌ Database Connection Failed', error);
    process.exit(1);
  }
};


import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorMiddleware';

const app: Application = express();


// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Webhook routes need raw body, so they must come BEFORE express.json()
import paymentRoutes from './routes/paymentRoutes';
app.use('/api/payments', paymentRoutes);

// JSON parser middleware with size limit (after webhook routes)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Base Route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Welcome to apex-core API!',
    status: 'Running'
  });
});

// Auth Routes with Rate Limiting
import authRoutes from './routes/authRoutes';
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 35, // 35 requests per window
  message: 'Too many authentication attempts, please try again later.',
});
app.use('/api/auth', authLimiter, authRoutes);


// Database: PostgreSQL (Prisma)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// We will add connection logic here later



// Payment webhook routes already mounted above (before json middleware)

// Email Routes
import emailRoutes from './routes/emailRoutes';
app.use('/api/email', emailRoutes);

// Storage Routes
import storageRoutes from './routes/storageRoutes';
app.use('/api/storage', storageRoutes);

// Error Handler (MUST be after all routes but BEFORE server starts)
app.use(errorHandler);

export default app;
import { Router } from 'express';
import { checkout, webhook } from '../controllers/paymentController';
import express from 'express';

import { protect } from '../middleware/authMiddleware';

const router = Router();

// Webhook endpoint (public, uses raw body parser)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  webhook
);

// Checkout endpoint (protected)
router.post('/checkout'
, protect

, checkout);

export default router;

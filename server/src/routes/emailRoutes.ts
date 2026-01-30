import { Router } from 'express';
import { sendWelcomeEmail, sendVerificationEmail } from '../controllers/emailController';

import { protect } from '../middleware/authMiddleware';

const router = Router();

// Send welcome email (Public)
router.post('/welcome', sendWelcomeEmail);

// Send verification email (Public)
router.post('/verify', sendVerificationEmail);

export default router;

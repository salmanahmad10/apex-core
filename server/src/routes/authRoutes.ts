import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { db } from '../db';

const router = Router();

// Public auth endpoints
router.post('/register', register);
router.post('/login', login);

// Protected: Get current user profile
router.get('/me', protect, async (req, res) => {
	try {
		const payload = req.user as any;
		const userId = payload?.userId;
		if (!userId) {
			return res.status(400).json({ message: 'Invalid token payload' });
		}

		const user = await db.user.findUnique({ 
			where: { id: userId },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				createdAt: true,
			}
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.json({ user });
	} catch (error) {
		return res.status(500).json({ message: 'Server error' });
	}
});

export default router;


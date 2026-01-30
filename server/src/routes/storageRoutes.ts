import { Router } from 'express';
import multer from 'multer';
import { upload } from '../controllers/uploadController';

import { protect } from '../middleware/authMiddleware';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
});

// Upload endpoint (Protected)
router.post('/upload'
, protect

, uploadMiddleware.single('file'), upload);

export default router;

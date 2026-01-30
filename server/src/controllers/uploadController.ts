import { Request, Response } from 'express';
import { storageService } from '../services/storageService';

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = await storageService.uploadFile(req.file);
    return res.json({ url: fileUrl, filename: req.file.originalname });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: error?.message || 'Upload failed' });
  }
};

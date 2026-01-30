import { Request, Response } from 'express';
import { emailService } from '../services/emailService';

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: 'Missing email or name' });
    }

    const html = `
      <h1>Welcome to apex-core, ${name}!</h1>
      <p>Thank you for signing up. We're excited to have you on board.</p>
    `;

    await emailService.sendEmail(email, `Welcome to apex-core`, html);
    return res.json({ message: 'Welcome email sent' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to send email' });
  }
};

export const sendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ message: 'Missing email or verificationCode' });
    }

    const html = `
      <h1>Verify Your Email</h1>
      <p>Use this code to verify your email: <strong>${verificationCode}</strong></p>
      <p>This code expires in 1 hour.</p>
    `;

    await emailService.sendEmail(email, 'Verify Your Email', html);
    return res.json({ message: 'Verification email sent' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to send verification email' });
  }
};

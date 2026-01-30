export interface EmailProvider {
  sendEmail(to: string, subject: string, html: string): Promise<void>;
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || 'noreply@apex-core.com';

const emailServiceInstance: EmailProvider = {
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await resend.emails.send({
        from: fromEmail,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Resend email error:', error);
      throw new Error('Failed to send email via Resend');
    }
  },
};

export const emailService = emailServiceInstance;



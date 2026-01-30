import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';

export const checkout = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.body as { priceId: string };
    const user = req.user as any;
    const userId = user?.userId || user?._id;
    const email = user?.email;

    if (!priceId || !userId || !email) {
      return res.status(400).json({ message: 'Missing priceId, userId, or email' });
    }

    const sessionUrl = await paymentService.createCheckoutSession(userId, email, priceId);
    return res.json({ url: sessionUrl });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return res.status(500).json({ message: err?.message || 'Checkout failed' });
  }
};

export const webhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    const payload = req.body;

    if (!signature) {
      return res.status(400).json({ message: 'Missing signature' });
    }

    // Validate and construct the event
    const event = await paymentService.constructWebhookEvent(payload, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Checkout completed:', event.data);
        // TODO: Update user subscription status in database
        break;
      case 'customer.subscription.updated':
        console.log('📝 Subscription updated:', event.data);
        // TODO: Update subscription details
        break;
      case 'customer.subscription.deleted':
        console.log('❌ Subscription cancelled:', event.data);
        // TODO: Revoke access
        break;
      default:
        console.log('⚠️  Unhandled event type:', event.type);
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return res.status(400).json({ message: err?.message || 'Webhook failed' });
  }
};

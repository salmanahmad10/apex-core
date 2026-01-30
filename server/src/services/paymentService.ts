export interface PaymentService {
  createCheckoutSession(userId: string, email: string, priceId: string): Promise<string>;
  constructWebhookEvent(payload: any, signature: string): Promise<any>;
}

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const paymentServiceInstance: PaymentService = {
  async createCheckoutSession(userId: string, email: string, priceId: string): Promise<string> {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      client_reference_id: userId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL || 'http://localhost:3000'}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/billing/cancel`,
    });

    return session.url as string;
  },

  async constructWebhookEvent(payload: any, signature: string): Promise<any> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      return event;
    } catch (error) {
      throw new Error('Webhook signature verification failed');
    }
  },
};

export const paymentService = paymentServiceInstance;


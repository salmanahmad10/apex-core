'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Up to 1,000 requests/month',
      'Basic analytics',
      'Community support',
      '1 team member',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For growing businesses',
    features: [
      'Unlimited requests',
      'Advanced analytics',
      'Priority support',
      'Unlimited team members',
      'Custom integrations',
      'API access',
    ],
    cta: 'Subscribe',
    popular: true,
  },
];

export function Pricing() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (planName === 'Free') {
      router.push('/dashboard');
      return;
    }

    setLoading(planName);

    try {
      const response = await api.post('/payments/checkout', {
        priceId: 'price_pro_monthly', // Replace with your actual price ID
      });

      // Redirect to Stripe/LemonSqueezy checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.response?.data?.message || 'Failed to create checkout session');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative py-32 px-6 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border-2 border-violet-500'
                  : 'bg-zinc-950 border border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-zinc-400 ml-2">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Check className="w-5 h-5 text-violet-400" />
                    </div>
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading === plan.name}
                className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-zinc-100'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.name ? 'Processing...' : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

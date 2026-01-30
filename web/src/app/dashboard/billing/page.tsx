'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { CreditCard, ExternalLink, CheckCircle2 } from 'lucide-react';

// Mock current plan - in real app, fetch from API
const currentPlan = {
  name: 'Free',
  price: '$0',
  period: '/month',
  features: [
    'Up to 1,000 requests/month',
    'Basic analytics',
    'Community support',
  ],
};

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);

    try {
      // Call backend to create customer portal session
      const response = await api.post('/payments/portal');
      
      // Redirect to Stripe/LemonSqueezy customer portal
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      console.error('Portal error:', error);
      alert(error.response?.data?.message || 'Failed to open billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    // Scroll to pricing section on home page
    window.location.href = '/#pricing';
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
        <p className="text-zinc-400">Manage your subscription and billing information</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-violet-400" />
            <h2 className="text-xl font-semibold text-white">Current Plan</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-white">{currentPlan.name}</span>
              <span className="text-lg text-zinc-400">{currentPlan.price}{currentPlan.period}</span>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-violet-400 mt-0.5" />
                <span className="text-zinc-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {currentPlan.name === 'Free' ? (
            <button
              onClick={handleUpgrade}
              className="w-full px-4 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-100 transition-colors"
            >
              Upgrade to Pro
            </button>
          ) : (
            <button
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ExternalLink className="w-5 h-5" />
              <span>{isLoading ? 'Loading...' : 'Manage Subscription'}</span>
            </button>
          )}
        </div>

        {/* Billing Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Billing Information</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Payment Method</p>
              <p className="text-zinc-300">
                {currentPlan.name === 'Free' ? 'No payment method on file' : 'Visa ending in 4242'}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500 mb-1">Next Billing Date</p>
              <p className="text-zinc-300">
                {currentPlan.name === 'Free' ? 'N/A' : 'February 15, 2026'}
              </p>
            </div>
          </div>

          <button
            onClick={handleManageSubscription}
            disabled={isLoading}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Update Billing Info'}
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">Billing History</h2>
        </div>
        <div className="p-6">
          <p className="text-zinc-400 text-sm text-center py-8">
            {currentPlan.name === 'Free' 
              ? 'No billing history available'
              : 'Your billing history will appear here'}
          </p>
        </div>
      </div>
    </div>
  );
}

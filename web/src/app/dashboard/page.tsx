'use client';

import { useAuth } from '@/hooks/useAuth';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Revenue',
    value: '$12,426',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Active Users',
    value: '1,429',
    change: '+5.2%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Conversion Rate',
    value: '3.24%',
    change: '-1.2%',
    changeType: 'decrease',
    icon: TrendingUp,
  },
];

const recentActivity = [
  { id: 1, event: 'New user registered', time: '2 minutes ago' },
  { id: 2, event: 'Payment received', time: '15 minutes ago' },
  { id: 3, event: 'New subscription started', time: '1 hour ago' },
  { id: 4, event: 'User upgraded plan', time: '2 hours ago' },
  { id: 5, event: 'Support ticket resolved', time: '3 hours ago' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-zinc-400">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'increase'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-300">{activity.event}</p>
                <p className="text-xs text-zinc-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

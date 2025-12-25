'use client';

import { useBoostUserStats } from '@/hooks/useBoostUserStats';
import { formatTimestamp } from '@/utils/time';

export default function StatsCard() {
    const {
        streak,
        pendingRewardsFormatted,
        lastCheckIn,
        isLoading
    } = useBoostUserStats();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="stat-card h-32 bg-white/5" />
                ))}
            </div>
        );
    }

    const stats = [
        {
            label: 'Premium Streak',
            value: streak,
            suffix: streak === 1 ? 'day' : 'days',
            icon: '⚡',
            gradient: 'from-yellow-400 to-orange-600',
        },
        {
            label: 'Boost Rewards',
            value: pendingRewardsFormatted,
            suffix: 'ETH',
            icon: '💎',
            gradient: 'from-purple-500 to-pink-600',
        },
        {
            label: 'Last Check-In',
            value: formatTimestamp(lastCheckIn),
            suffix: '',
            icon: '📅',
            gradient: 'from-green-500 to-teal-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className="stat-card group glass-hover animate-in gradient-border"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Background glow that follows mouse */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl`} />

                    {/* Rotating gradient ring */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-base-blue to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
                        style={{ animation: 'rotate 3s linear infinite' }}
                    />

                    {/* Content */}
                    <div className="relative z-10 bg-black/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                {stat.label}
                            </span>
                            <span className="text-4xl floating" style={{ animationDelay: `${index * 0.3}s` }}>
                                {stat.icon}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                                style={{ animation: 'gradientShift 3s ease infinite' }}>
                                {stat.value}
                            </span>
                            {stat.suffix && (
                                <span className="text-lg text-gray-400 font-medium">
                                    {stat.suffix}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Shimmer effect on hover */}
                    <div className="shimmer-overlay opacity-0 group-hover:opacity-100" />
                </div>
            ))}
        </div>
    );
}

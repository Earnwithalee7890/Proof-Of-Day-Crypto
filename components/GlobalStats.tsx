'use client';

import { useReadContract, useGasPrice, useBalance } from 'wagmi';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';
import { formatEther, formatGwei } from 'viem';
import AnimatedCounter from './AnimatedCounter';

export default function GlobalStats() {
    // Real-time data fetching
    const { data: balanceData } = useBalance({
        address: DAILY_CHECKIN_WITH_FEES_ADDRESS,
        chainId: 8453,
        query: { refetchInterval: 10000 }
    });

    const { data: rewardData } = useReadContract({
        address: DAILY_CHECKIN_WITH_FEES_ADDRESS,
        abi: DAILY_CHECKIN_WITH_FEES_ABI,
        functionName: 'rewardPerCheckIn',
    });

    const { data: gasPrice } = useGasPrice({ chainId: 8453, query: { refetchInterval: 5000 } });

    const stats = [
        {
            icon: '💎',
            label: 'Reward Pool',
            value: balanceData ? parseFloat(formatEther(balanceData.value)) : 0,
            suffix: ' ETH',
            color: 'text-blue-400',
            bgGradient: 'from-blue-500/10 to-blue-600/10',
            decimals: 4,
            isStatic: false,
            customLabel: null
        },
        {
            icon: '🎁',
            label: 'Pay Per Check-In',
            value: rewardData ? parseFloat(formatEther(rewardData)) : 0.0001,
            suffix: ' ETH',
            color: 'text-green-400',
            bgGradient: 'from-green-500/10 to-green-600/10',
            decimals: 5,
            isStatic: false,
            customLabel: null
        },
        {
            icon: '⛽',
            label: 'Base Gas',
            value: gasPrice ? parseFloat(formatGwei(gasPrice)) : 0,
            suffix: ' Gwei',
            color: 'text-yellow-400',
            bgGradient: 'from-yellow-500/10 to-yellow-600/10',
            decimals: 2,
            isStatic: false,
            customLabel: null
        },
        {
            icon: '⚡',
            label: 'Network Status',
            value: 100, // Active
            suffix: '',
            color: 'text-green-400',
            bgGradient: 'from-green-500/10 to-green-600/10',
            decimals: 0,
            isStatic: true,
            customLabel: 'Online'
        },
    ];

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">📊 Platform Stats</h2>
                    <p className="text-sm text-gray-400 mt-1">Real-time network activity</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">Live</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`relative overflow-hidden rounded-xl p-5 bg-gradient-to-br ${stat.bgGradient} border border-white/5 hover:border-white/10 transition-all duration-300 group`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="relative space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-3xl">{stat.icon}</span>
                                {stat.isStatic && (
                                    <div className={`px-2 py-1 rounded-lg bg-black/20 border border-white/10`}>
                                        <span className="text-xs font-mono text-gray-400">24h</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className={`text-3xl font-black ${stat.color} tracking-tight`}>
                                    {stat.customLabel ? (
                                        stat.customLabel
                                    ) : (
                                        <AnimatedCounter value={stat.value} decimals={stat.decimals} />
                                    )}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-400 font-medium">
                                    {stat.label}
                                    {stat.suffix}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';

export default function RewardCalculator() {
    const [days, setDays] = useState(30);
    const baseRewardPerDay = 0.0001; // ETH per check-in

    const calculateRewards = () => {
        let total = 0;
        let milestoneBonus = 0;

        // Base rewards
        total = days * baseRewardPerDay;

        // Milestone bonuses
        if (days >= 100) milestoneBonus += 0.01;
        if (days >= 30) milestoneBonus += 0.003;
        if (days >= 7) milestoneBonus += 0.001;

        const totalWithBonus = total + milestoneBonus;
        const ethPrice = 2966;
        const usdValue = totalWithBonus * ethPrice;

        return {
            baseRewards: total,
            milestoneBonus,
            total: totalWithBonus,
            usdValue,
        };
    };

    const rewards = calculateRewards();
    const progress = Math.min((days / 365) * 100, 100);

    const milestones = [
        { days: 7, bonus: '0.001 ETH', emoji: '💪', name: 'Week Warrior' },
        { days: 30, bonus: '0.003 ETH', emoji: '🔥', name: 'Monthly Legend' },
        { days: 100, bonus: '0.01 ETH', emoji: '👑', name: 'Century Club' },
        { days: 365, bonus: '0.05 ETH', emoji: '🏆', name: 'Year Champion' },
    ];

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    💰 Reward Calculator
                </h2>
                <p className="text-sm text-gray-400 mt-1">Project your future earnings</p>
            </div>

            {/* Input Slider */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">Streak Duration</label>
                    <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <span className="text-2xl font-black text-blue-400">{days}</span>
                        <span className="text-sm text-gray-400 ml-1">days</span>
                    </div>
                </div>
                <input
                    type="range"
                    min="1"
                    max="365"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>1 day</span>
                    <span>1 year</span>
                </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-400 mb-2">Base Rewards</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{rewards.baseRewards.toFixed(4)}</span>
                        <span className="text-sm text-gray-400">ETH</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">${(rewards.baseRewards * 2966).toFixed(2)} USD</p>
                </div>

                <div className="rounded-xl p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-purple-400 mb-2">Milestone Bonus</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{rewards.milestoneBonus.toFixed(4)}</span>
                        <span className="text-sm text-gray-400">ETH</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">${(rewards.milestoneBonus * 2966).toFixed(2)} USD</p>
                </div>
            </div>

            {/* Total */}
            <div className="rounded-xl p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-2">Total Projected Earnings</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gradient">{rewards.total.toFixed(4)}</span>
                    <span className="text-xl text-gray-300">ETH</span>
                </div>
                <p className="text-lg text-green-400 mt-2 font-bold">${rewards.usdValue.toFixed(2)} USD</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress to 1 year</span>
                    <span className="text-white font-bold">{progress.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Milestones */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-300">Upcoming Milestones</p>
                <div className="grid grid-cols-2 gap-2">
                    {milestones.map((milestone) => (
                        <div
                            key={milestone.days}
                            className={`p-3 rounded-lg border ${days >= milestone.days
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-white/5 border-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{milestone.emoji}</span>
                                <div>
                                    <p className="text-xs font-bold text-white">{milestone.name}</p>
                                    <p className="text-[10px] text-gray-400">{milestone.days} days • {milestone.bonus}</p>
                                </div>
                                {days >= milestone.days && (
                                    <span className="ml-auto text-green-400">✓</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                Calculations based on current reward rates • Subject to change
            </div>
        </div>
    );
}

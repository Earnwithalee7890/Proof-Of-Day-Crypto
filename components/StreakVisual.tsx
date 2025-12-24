'use client';

import { useUserStats } from '@/hooks/useUserStats';

export default function StreakVisual() {
    const { streak } = useUserStats();

    const getMilestoneStatus = () => {
        if (streak >= 100) return { text: 'LEGENDARY', color: 'text-purple-400', icon: '👑' };
        if (streak >= 30) return { text: 'ON FIRE', color: 'text-orange-400', icon: '🔥' };
        if (streak >= 7) return { text: 'HOT STREAK', color: 'text-yellow-400', icon: '⚡' };
        if (streak >= 3) return { text: 'WARMING UP', color: 'text-blue-400', icon: '💪' };
        return { text: 'GETTING STARTED', color: 'text-gray-400', icon: '🌱' };
    };

    const milestone = getMilestoneStatus();
    const progress = Math.min((streak / 100) * 100, 100);

    return (
        <div className="stat-card text-center space-y-4">
            {/* Streak number */}
            <div className="relative">
                <div className={`text-8xl font-black ${streak >= 7 ? 'fire-effect' : ''} animate-float`}>
                    {milestone.icon}
                </div>
            </div>

            {/* Streak count */}
            <div>
                <div className="text-6xl font-black text-gradient mb-2">
                    {streak}
                </div>
                <div className={`text-sm font-bold tracking-widest ${milestone.color}`}>
                    {milestone.text}
                </div>
            </div>

            {/* Progress bar to next milestone */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Next milestone:</span>
                    <span className="font-semibold">
                        {streak < 3 && '3 days'}
                        {streak >= 3 && streak < 7 && '7 days'}
                        {streak >= 7 && streak < 30 && '30 days'}
                        {streak >= 30 && streak < 100 && '100 days'}
                        {streak >= 100 && 'MAX! 🎉'}
                    </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

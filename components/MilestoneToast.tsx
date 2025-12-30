'use client';

import { useEffect, useState } from 'react';

interface MilestoneToastProps {
    streak: number;
    onClose: () => void;
}

export default function MilestoneToast({ streak, onClose }: MilestoneToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getMilestone = (streak: number) => {
        if (streak >= 100) return { icon: '👑', title: 'Century Club!', message: '100 days of consistency!', color: 'from-purple-500 to-pink-500' };
        if (streak >= 30) return { icon: '🔥', title: 'Monthly Legend!', message: '30 days strong!', color: 'from-orange-500 to-red-500' };
        if (streak >= 7) return { icon: '💪', title: 'Week Warrior!', message: '7 days in a row!', color: 'from-blue-500 to-cyan-500' };
        if (streak >= 3) return { icon: '🌱', title: 'Getting Started!', message: '3 days of progress!', color: 'from-green-500 to-emerald-500' };
        return null;
    };

    const milestone = getMilestone(streak);
    if (!milestone) return null;

    return (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
            <div className={`glass rounded-2xl p-6 min-w-[320px] border-2 border-white/20 shadow-2xl bg-gradient-to-r ${milestone.color} bg-opacity-20`}>
                <div className="flex items-start gap-4">
                    <div className="text-5xl animate-bounce">{milestone.icon}</div>
                    <div className="flex-1">
                        <h3 className="text-xl font-black text-white mb-1">{milestone.title}</h3>
                        <p className="text-sm text-gray-200">{milestone.message}</p>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="px-3 py-1 rounded-full bg-black/30 border border-white/20">
                                <span className="text-xs font-bold text-white">{streak} Day Streak</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}

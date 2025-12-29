'use client';

import { motion } from 'framer-motion';
import { useUserStats } from '@/hooks/useUserStats';
import { useState } from 'react';

interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    requirement: number;
    color: string;
}

const BADGES: Badge[] = [
    {
        id: 'starter',
        name: 'First Steps',
        icon: '🌱',
        description: 'Complete your first check-in',
        requirement: 1,
        color: 'from-green-400 to-emerald-600',
    },
    {
        id: 'warming',
        name: 'Getting Warm',
        icon: '💪',
        description: 'Reach a 3-day streak',
        requirement: 3,
        color: 'from-blue-400 to-cyan-600',
    },
    {
        id: 'hot',
        name: 'Hot Streak',
        icon: '⚡',
        description: 'Maintain a 7-day streak',
        requirement: 7,
        color: 'from-yellow-400 to-orange-600',
    },
    {
        id: 'fire',
        name: 'On Fire',
        icon: '🔥',
        description: 'Achieve a 30-day streak',
        requirement: 30,
        color: 'from-orange-400 to-red-600',
    },
    {
        id: 'legend',
        name: 'Legendary',
        icon: '👑',
        description: 'Reach 100-day streak',
        requirement: 100,
        color: 'from-purple-400 to-pink-600',
    },
];

export default function AchievementBadges() {
    const { streak } = useUserStats();
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

    const isBadgeUnlocked = (requirement: number) => streak >= requirement;
    const unlockedCount = BADGES.filter(badge => isBadgeUnlocked(badge.requirement)).length;

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gradient">Achievements</h3>
                <p className="text-sm text-gray-400">
                    Unlocked <span className="text-base-blue font-bold">{unlockedCount}</span> of <span className="font-bold">{BADGES.length}</span> badges
                </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-5 gap-3 md:gap-4">
                {BADGES.map((badge, index) => {
                    const unlocked = isBadgeUnlocked(badge.requirement);
                    const progress = Math.min((streak / badge.requirement) * 100, 100);

                    return (
                        <motion.button
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: unlocked ? 1.1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedBadge(selectedBadge?.id === badge.id ? null : badge)}
                            className={`
                                relative aspect-square rounded-xl flex items-center justify-center text-4xl
                                transition-all duration-300 touch-manipulation
                                ${unlocked
                                    ? `bg-gradient-to-br ${badge.color} shadow-lg hover:shadow-xl`
                                    : 'bg-white/5 grayscale opacity-40'
                                }
                            `}
                        >
                            {/* Badge Icon */}
                            <span className={unlocked ? 'animate-float' : ''}>{badge.icon}</span>

                            {/* Progress Ring for Locked Badges */}
                            {!unlocked && progress > 0 && (
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="45%"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-white/20"
                                    />
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="45%"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray={`${progress * 2.83} 283`}
                                        className="text-base-blue"
                                    />
                                </svg>
                            )}

                            {/* Unlock Glow */}
                            {unlocked && (
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${badge.color} opacity-50 blur-xl`} />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Badge Details */}
            {selectedBadge && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="glass-hover rounded-xl p-4 space-y-2"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{selectedBadge.icon}</span>
                            <div>
                                <h4 className="font-bold text-lg">{selectedBadge.name}</h4>
                                <p className="text-sm text-gray-400">{selectedBadge.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase">Requirement</p>
                            <p className="text-2xl font-black text-gradient">{selectedBadge.requirement}</p>
                            <p className="text-xs text-gray-500">days</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {!isBadgeUnlocked(selectedBadge.requirement) && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Progress</span>
                                <span className="font-semibold">{streak} / {selectedBadge.requirement} days</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <motion.div
                                    className={`h-full rounded-full bg-gradient-to-r ${selectedBadge.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((streak / selectedBadge.requirement) * 100, 100)}%` }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    )}

                    {isBadgeUnlocked(selectedBadge.requirement) && (
                        <div className={`text-center py-2 rounded-lg bg-gradient-to-r ${selectedBadge.color} text-white font-bold text-sm`}>
                            ✓ Unlocked!
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}

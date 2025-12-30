'use client';

import { useState } from 'react';
import sdk from '@farcaster/frame-sdk';

interface ShareTemplate {
    id: string;
    title: string;
    icon: string;
    getMessage: (streak: number, eth: number) => string;
}

export default function ShareTemplates() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [streak] = useState(15); // This would come from user stats in production
    const [eth] = useState(0.045); // This would come from user stats in production

    const templates: ShareTemplate[] = [
        {
            id: 'daily',
            title: 'Daily Check-In',
            icon: '✅',
            getMessage: (streak, eth) => `Just checked in on @ProofOfDay! 🔵\n\n🔥 Streak: ${streak} days\n💎 Earned: ${eth} ETH\n\nBuilding consistency onchain on @base\n\nhttps://proof-of-day.vercel.app`,
        },
        {
            id: 'milestone',
            title: 'Milestone',
            icon: '🎯',
            getMessage: (streak, eth) => `🎉 ${streak} days of showing up!\n\nProof Of Day keeps me consistent on @base\n💎 ${eth} ETH earned just by showing up daily\n\nJoin me: https://proof-of-day.vercel.app`,
        },
        {
            id: 'brag',
            title: 'Flex Your Streak',
            icon: '🔥',
            getMessage: (streak, eth) => `${streak} days. Zero misses. Pure consistency. 💪\n\nThat's ${eth} ETH earned on @base just for showing up.\n\nProof Of Day → https://proof-of-day.vercel.app`,
        },
        {
            id: 'invite',
            title: 'Invite Friends',
            icon: '🚀',
            getMessage: (streak, eth) => `I've been checking in daily on Proof Of Day for ${streak} days straight 🔥\n\nIt's simple:\n✅ Check in once daily\n💎 Earn ETH rewards\n🔵 Build onchain on @base\n\nJoin me: https://proof-of-day.vercel.app`,
        },
    ];

    const handleCopy = async (template: ShareTemplate) => {
        const message = template.getMessage(streak, eth);
        await navigator.clipboard.writeText(message);
        setCopiedId(template.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleShareOnFarcaster = async (template: ShareTemplate) => {
        const message = template.getMessage(streak, eth);
        try {
            await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(message)}`);
        } catch (error) {
            // Fallback: copy to clipboard
            handleCopy(template);
        }
    };

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    📱 Share Templates
                </h2>
                <p className="text-sm text-gray-400 mt-1">Pre-built messages for social sharing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4 group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">{template.icon}</div>
                                <div>
                                    <h3 className="font-bold text-white">{template.title}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                            <p className="text-sm text-gray-300 whitespace-pre-line line-clamp-4">
                                {template.getMessage(streak, eth)}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleCopy(template)}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                            >
                                {copiedId === template.id ? (
                                    <>
                                        <span>✓</span>
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>📋</span>
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => handleShareOnFarcaster(template)}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/40 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                            >
                                <span>🟣</span>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                Share your progress and inspire others to join! 🚀
            </div>
        </div>
    );
}

'use client';

import { useFarcasterAccount } from '@/hooks/useFarcasterAccount';
import { useBaseAccount } from '@/hooks/useBaseAccount';
import { useAccount } from 'wagmi';
import { useBoostUserStats } from '@/hooks/useBoostUserStats';

export default function UserProfile() {
    const { address } = useAccount();
    const {
        farcasterUser,
        username,
        displayName,
        pfp,
        hasFarcaster,
        isLoading: fcLoading
    } = useFarcasterAccount();

    const { basename, formattedAddress } = useBaseAccount();
    const { streak: boostStreak } = useBoostUserStats();

    if (!address) return null;

    if (fcLoading) {
        return (
            <div className="glass rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-full" />
                    <div className="flex-1">
                        <div className="h-4 bg-white/10 rounded w-24 mb-2" />
                        <div className="h-3 bg-white/10 rounded w-32" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass glass-hover rounded-2xl p-4 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-base-blue/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-4 relative z-10">
                {/* Profile Picture with Glowing Ring */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-base-blue to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    {hasFarcaster && pfp ? (
                        <img
                            src={pfp}
                            alt={displayName || username || 'User'}
                            className="w-14 h-14 rounded-full border-2 border-base-blue/50 relative z-10 object-cover shadow-lg"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-base-blue to-purple-600 flex items-center justify-center text-2xl relative z-10 shadow-lg">
                            {displayName?.[0] || username?.[0] || '👤'}
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    {hasFarcaster ? (
                        <div className="space-y-0.5">
                            <h3 className="font-black text-white text-lg tracking-tight truncate group-hover:text-base-blue transition-colors duration-300">
                                {displayName || username}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-white/5 group-hover:border-base-blue/30 transition-all duration-300">
                                    <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                    </svg>
                                    @{username}
                                </span>
                                {basename && (
                                    <span className="text-[10px] font-bold text-base-blue uppercase tracking-widest px-2 py-0.5 rounded-md bg-base-blue/10 border border-base-blue/20">
                                        {basename}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            <h3 className="font-black text-white text-lg tracking-tight truncate group-hover:text-base-blue transition-colors duration-300">
                                {basename || formattedAddress}
                            </h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                {basename ? formattedAddress : 'Connected Explorer'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Status Indicator & Boost Badge */}
                <div className="hidden sm:flex flex-col items-end gap-2">
                    {boostStreak > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-tighter milestone-glow">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                            Boosted
                        </div>
                    )}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-tighter">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Online
                    </div>
                </div>
            </div>
        </div>
    );
}


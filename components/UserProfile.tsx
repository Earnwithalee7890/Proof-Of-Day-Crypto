'use client';

import { useFarcasterAccount } from '@/hooks/useFarcasterAccount';
import { useBaseAccount } from '@/hooks/useBaseAccount';
import { useAccount } from 'wagmi';

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
        <div className="glass glass-hover rounded-xl p-4 transition-all duration-300">
            <div className="flex items-center gap-3">
                {/* Profile Picture */}
                {hasFarcaster && pfp ? (
                    <img
                        src={pfp}
                        alt={displayName || username || 'User'}
                        className="w-12 h-12 rounded-full border-2 border-base-blue"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-base-blue to-purple-600 flex items-center justify-center text-xl">
                        {displayName?.[0] || username?.[0] || '👤'}
                    </div>
                )}

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    {hasFarcaster ? (
                        <>
                            <div className="font-bold text-white truncate">
                                {displayName || username}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-2">
                                <span className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                    </svg>
                                    @{username}
                                </span>
                                {basename && (
                                    <span className="flex items-center gap-1">
                                        <span className="text-base-blue">•</span>
                                        {basename}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="font-bold text-white truncate">
                                {basename || formattedAddress}
                            </div>
                            <div className="text-xs text-gray-400">
                                {basename ? formattedAddress : 'Connected Wallet'}
                            </div>
                        </>
                    )}
                </div>

                {/* Farcaster Badge */}
                {hasFarcaster && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                        </svg>
                        Farcaster
                    </div>
                )}
            </div>
        </div>
    );
}

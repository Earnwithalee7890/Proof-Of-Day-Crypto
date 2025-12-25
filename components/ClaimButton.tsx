'use client';

import { useBoostClaimRewards } from '@/hooks/useBoostClaimRewards';
import { useBoostUserStats } from '@/hooks/useBoostUserStats';

export default function ClaimButton() {
    const {
        claimRewards: claimBoost,
        isPending: boostPending,
        isConfirming: boostConfirming,
        isSuccess: boostSuccess,
        error: boostError
    } = useBoostClaimRewards();

    const { pendingRewards: boostRewards, pendingRewardsFormatted: boostFormatted, refetch: refetchBoost } = useBoostUserStats();

    const hasBoost = boostRewards > BigInt(0);

    if (!hasBoost && !boostSuccess) {
        return (
            <div className="glass rounded-xl p-6 border-dashed border-2 border-white/10 text-center">
                <p className="text-gray-400">
                    No rewards to claim yet. Boost your check-in to earn rewards! 🎁
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="max-w-md mx-auto">
                {/* Boost Claim */}
                <button
                    onClick={() => {
                        claimBoost();
                        setTimeout(() => refetchBoost(), 2000);
                    }}
                    disabled={!hasBoost || boostPending || boostConfirming || boostSuccess}
                    className={`
                        w-full text-lg py-5 rounded-2xl flex items-center justify-center gap-3 border-2 transition-all duration-500
                        ${hasBoost && !boostPending && !boostConfirming && !boostSuccess
                            ? 'border-yellow-500/50 bg-black/40 text-yellow-500 shadow-lg shadow-yellow-500/20 glow-strong'
                            : 'border-white/10 opacity-50'
                        }
                        ${boostSuccess ? 'bg-yellow-600 text-white border-yellow-400' : ''}
                    `}
                >
                    {boostPending || boostConfirming ? (
                        <div className="spinner !border-yellow-500 h-5 w-5" />
                    ) : boostSuccess ? (
                        <span className="flex items-center gap-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Rewards Claimed!
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Claim {boostFormatted} ETH
                        </span>
                    )}
                </button>
            </div>

            {boostError && (
                <div className="p-3 glass rounded-lg border border-red-500/50 text-red-400 text-sm">
                    <p className="font-semibold">Error:</p>
                    <p className="opacity-80">
                        {(boostError as Error).message}
                    </p>
                </div>
            )}
        </div>
    );
}

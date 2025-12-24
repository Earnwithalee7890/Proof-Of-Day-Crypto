'use client';

import { useClaimRewards } from '@/hooks/useClaimRewards';
import { useUserStats } from '@/hooks/useUserStats';
import { parseEther } from 'viem';

export default function ClaimButton() {
    const { claimRewards, isPending, isConfirming, isSuccess, error } = useClaimRewards();
    const { pendingRewards, pendingRewardsFormatted, refetch } = useUserStats();

    const hasPendingRewards = pendingRewards > BigInt(0);

    const handleClaim = () => {
        if (hasPendingRewards && !isPending && !isConfirming) {
            claimRewards();
            setTimeout(() => refetch(), 2000);
        }
    };

    if (!hasPendingRewards && !isSuccess) {
        return (
            <div className="glass rounded-xl p-6 border-dashed border-2 border-white/10 text-center">
                <p className="text-gray-400">
                    No rewards to claim yet. Check in daily to earn rewards! 🎁
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <button
                onClick={handleClaim}
                disabled={!hasPendingRewards || isPending || isConfirming || isSuccess}
                className={`
          btn-primary w-full text-xl
          ${hasPendingRewards && !isPending && !isConfirming && !isSuccess ? 'glow' : ''}
          ${isSuccess ? 'bg-green-600' : ''}
        `}
            >
                {isPending || isConfirming ? (
                    <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {isPending ? 'Confirming...' : 'Processing...'}
                    </span>
                ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-3">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Rewards Claimed! 💰
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-3">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Claim {pendingRewardsFormatted} ETH
                    </span>
                )}
            </button>

            {error && (
                <div className="p-3 glass rounded-lg border border-red-500/50 text-red-400 text-sm">
                    <p className="font-semibold">Error:</p>
                    <p className="opacity-80">{(error as Error).message}</p>
                </div>
            )}
        </div>
    );
}

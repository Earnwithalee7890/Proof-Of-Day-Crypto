'use client';

import { useClaimRewards } from '@/hooks/useClaimRewards';
import { useBoostClaimRewards } from '@/hooks/useBoostClaimRewards';
import { useUserStats } from '@/hooks/useUserStats';
import { useBoostUserStats } from '@/hooks/useBoostUserStats';

export default function ClaimButton() {
    const {
        claimRewards: claimStandard,
        isPending: standardPending,
        isConfirming: standardConfirming,
        isSuccess: standardSuccess,
        error: standardError
    } = useClaimRewards();

    const {
        claimRewards: claimBoost,
        isPending: boostPending,
        isConfirming: boostConfirming,
        isSuccess: boostSuccess,
        error: boostError
    } = useBoostClaimRewards();

    const { pendingRewards: standardRewards, pendingRewardsFormatted: standardFormatted, refetch: refetchStandard } = useUserStats();
    const { pendingRewards: boostRewards, pendingRewardsFormatted: boostFormatted, refetch: refetchBoost } = useBoostUserStats();

    const hasStandard = standardRewards > BigInt(0);
    const hasBoost = boostRewards > BigInt(0);

    if (!hasStandard && !hasBoost && !standardSuccess && !boostSuccess) {
        return (
            <div className="glass rounded-xl p-6 border-dashed border-2 border-white/10 text-center">
                <p className="text-gray-400">
                    No rewards to claim yet. Check in or Boost to earn rewards! 🎁
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                {/* Standard Claim */}
                <button
                    onClick={() => {
                        claimStandard();
                        setTimeout(() => refetchStandard(), 2000);
                    }}
                    disabled={!hasStandard || standardPending || standardConfirming || standardSuccess}
                    className={`
                        btn-primary w-full text-base py-4 rounded-xl flex items-center justify-center gap-2
                        ${hasStandard && !standardPending && !standardConfirming && !standardSuccess ? 'glow' : 'opacity-50'}
                        ${standardSuccess ? 'bg-green-600' : ''}
                    `}
                >
                    {standardPending || standardConfirming ? (
                        <div className="spinner h-4 w-4" />
                    ) : standardSuccess ? (
                        'Standard Claimed!'
                    ) : (
                        `Claim Standard (${standardFormatted} ETH)`
                    )}
                </button>

                {/* Boost Claim */}
                <button
                    onClick={() => {
                        claimBoost();
                        setTimeout(() => refetchBoost(), 2000);
                    }}
                    disabled={!hasBoost || boostPending || boostConfirming || boostSuccess}
                    className={`
                        w-full text-base py-4 rounded-xl flex items-center justify-center gap-2 border-2
                        ${hasBoost && !boostPending && !boostConfirming && !boostSuccess
                            ? 'border-yellow-500/50 bg-black/40 text-yellow-500 shadow-lg shadow-yellow-500/20 glow-strong'
                            : 'border-white/10 opacity-50'
                        }
                        ${boostSuccess ? 'bg-yellow-600 text-white border-yellow-400' : ''}
                    `}
                >
                    {boostPending || boostConfirming ? (
                        <div className="spinner !border-yellow-500 h-4 w-4" />
                    ) : boostSuccess ? (
                        'Boosted Rewards Claimed!'
                    ) : (
                        `Claim Boost (${boostFormatted} ETH)`
                    )}
                </button>
            </div>

            {(standardError || boostError) && (
                <div className="p-3 glass rounded-lg border border-red-500/50 text-red-400 text-sm">
                    <p className="font-semibold">Error:</p>
                    <p className="opacity-80">
                        {((standardError || boostError) as Error).message}
                    </p>
                </div>
            )}
        </div>
    );
}

'use client';

import { useUserStats } from '@/hooks/useUserStats';
import { useAccount } from 'wagmi';

export default function ShareButton() {
    const { streak, pendingRewardsFormatted } = useUserStats();
    const { address } = useAccount();

    const handleShare = () => {
        const shareText = `Just checked in on Base! 🔵\n\n🔥 ${streak} day streak\n💎 ${pendingRewardsFormatted} ETH earned\n\nProof of showing up, onchain.\n\nJoin me: ${window.location.origin}`;

        // Copy to clipboard
        navigator.clipboard.writeText(shareText);

        // Open Farcaster (Warpcast) share
        const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
        window.open(warpcastUrl, '_blank');
    };

    const handleShareToBase = () => {
        const shareText = `Just checked in on Base! 🔵 ${streak} day streak 🔥`;
        const baseUrl = `https://base.org/share?text=${encodeURIComponent(shareText)}`;
        window.open(baseUrl, '_blank');
    };

    if (!address) return null;

    return (
        <div className="flex gap-3">
            <button
                onClick={handleShare}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Share on Farcaster
            </button>

            <button
                onClick={handleShareToBase}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share on Base
            </button>
        </div>
    );
}

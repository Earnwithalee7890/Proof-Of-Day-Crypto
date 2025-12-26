'use client';

import { useUserStats } from '@/hooks/useUserStats';
import { useAccount } from 'wagmi';
import { useFarcasterAccount } from '@/hooks/useFarcasterAccount';

export default function ShareButton() {
    const { streak, pendingRewardsFormatted } = useUserStats();
    const { address } = useAccount();
    const { username, pfp } = useFarcasterAccount();

    const handleShare = () => {
        const shareText = `Just checked in on @base! 🔵\n\n🔥 ${streak} day streak\n💎 ${pendingRewardsFormatted} ETH earned\n\nProof of showing up, onchain.\n\nJoin the streak:`;

        const shareUrl = `https://proof-of-day.vercel.app/?address=${address}&streak=${streak}&rewards=${pendingRewardsFormatted}${username ? `&username=${encodeURIComponent(username)}` : ''}${pfp ? `&pfp=${encodeURIComponent(pfp)}` : ''}`;
        const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`;
        window.open(warpcastUrl, '_blank');
    };

    const handleShareToBase = () => {
        const shareText = `Proving my commitment daily on @base! 🔵 🔥 ${streak} day streak. #ProofOfDay`;
        const baseUrl = `https://base.org/share?text=${encodeURIComponent(shareText)}`;
        window.open(baseUrl, '_blank');
    };

    if (!address) return null;

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={handleShare}
                className="btn-primary flex-1 flex items-center justify-center gap-3 py-4 text-sm font-black uppercase tracking-widest shadow-lg shadow-purple-500/20"
            >
                <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
                Share on Farcaster
            </button>

            <button
                onClick={handleShareToBase}
                className="btn-secondary flex-1 flex items-center justify-center gap-3 py-4 text-sm font-black uppercase tracking-widest"
            >
                <div className="w-5 h-5 rounded-full bg-base-blue flex items-center justify-center text-[10px]">🔵</div>
                Share on Base
            </button>
        </div>
    );
}


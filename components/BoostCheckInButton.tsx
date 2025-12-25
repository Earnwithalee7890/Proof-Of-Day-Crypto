'use client';

import { useBoostCheckIn } from '@/hooks/useBoostCheckIn';
import { useUserStats } from '@/hooks/useUserStats'; // We'll keep sharing stats logic for now
import { formatCountdown } from '@/utils/time';
import { useEffect, useState } from 'react';
import Confetti from './Confetti';

export default function BoostCheckInButton() {
    const { boostCheckIn, isPending, isConfirming, isSuccess, error } = useBoostCheckIn();
    const { canCheckIn, timeUntilNextCheckIn, refetch } = useUserStats();
    const [countdown, setCountdown] = useState(timeUntilNextCheckIn);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setCountdown(timeUntilNextCheckIn);
    }, [timeUntilNextCheckIn]);

    useEffect(() => {
        if (!canCheckIn && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => Math.max(0, prev - 1));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [canCheckIn, countdown]);

    useEffect(() => {
        if (isSuccess) {
            setShowConfetti(true);
            setTimeout(() => {
                refetch();
            }, 2000);
        }
    }, [isSuccess, refetch]);

    const handleBoost = () => {
        if (!isPending && !isConfirming) {
            boostCheckIn();
        }
    };

    return (
        <div className="relative">
            <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

            <button
                onClick={handleBoost}
                disabled={isPending || isConfirming}
                className={`
          w-full text-xl py-6 rounded-2xl relative group overflow-hidden border-2
          ${isPending || isConfirming
                        ? 'border-white/10 opacity-50 cursor-not-allowed'
                        : 'border-yellow-500/50 hover:border-yellow-400 bg-black/40 shadow-lg shadow-yellow-500/10'
                    }
          transition-all duration-500
        `}
            >
                {/* Animated background gradient - Premium Gold */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundSize: '200% 100%', animation: 'gradientShift 3s ease infinite' }}
                />

                {/* Shimmer effect */}
                {!isPending && !isConfirming && (
                    <div className="shimmer-overlay opacity-50 group-hover:opacity-100" />
                )}

                {/* Ripple effect on click */}
                <span className="relative z-10 flex flex-col items-center justify-center gap-1">
                    {isPending || isConfirming ? (
                        <>
                            <div className="spinner !border-yellow-500" />
                            <span className="text-yellow-500 font-bold">{isPending ? 'Confirming...' : 'Processing...'}</span>
                        </>
                    ) : isSuccess ? (
                        <>
                            <svg className="h-8 w-8 text-yellow-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-yellow-400 font-black milestone-glow">Boost Successful! 🚀</span>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⚡</span>
                                <span className="font-black text-yellow-400 uppercase tracking-tighter">Boost Check-In</span>
                                <span className="text-2xl">⚡</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Premium Action • 0.000008 ETH
                            </span>
                        </>
                    )}
                </span>
            </button>

            {error && (
                <div className="mt-3 p-3 glass rounded-lg border border-red-500/50 text-red-400 text-sm animate-in">
                    <p className="font-semibold">Error:</p>
                    <p className="opacity-80">{(error as Error).message}</p>
                </div>
            )}
        </div>
    );
}

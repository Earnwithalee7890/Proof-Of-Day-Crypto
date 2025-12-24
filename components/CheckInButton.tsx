'use client';

import { useCheckIn } from '@/hooks/useCheckIn';
import { useUserStats } from '@/hooks/useUserStats';
import { formatCountdown } from '@/utils/time';
import { useEffect, useState } from 'react';
import Confetti from './Confetti';

export default function CheckInButton() {
    const { checkIn, isPending, isConfirming, isSuccess, error } = useCheckIn();
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

    const handleCheckIn = () => {
        if (canCheckIn && !isPending && !isConfirming) {
            checkIn();
        }
    };

    return (
        <div className="relative">
            <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

            <button
                onClick={handleCheckIn}
                disabled={!canCheckIn || isPending || isConfirming}
                className={`
          btn-primary w-full text-2xl py-6 relative group overflow-hidden
          ${canCheckIn && !isPending && !isConfirming ? 'animate-pulse-glow glow-strong' : ''}
          ${isSuccess ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
          transition-all duration-500
        `}
            >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundSize: '200% 100%', animation: 'gradientShift 3s ease infinite' }}
                />

                {/* Shimmer effect */}
                {canCheckIn && !isPending && !isConfirming && (
                    <div className="shimmer-overlay" />
                )}

                {/* Ripple effect on click */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                    {isPending || isConfirming ? (
                        <>
                            <div className="spinner" />
                            {isPending ? 'Confirming...' : 'Processing...'}
                        </>
                    ) : isSuccess ? (
                        <>
                            <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="milestone-glow">Proof Recorded! 🎉</span>
                        </>
                    ) : canCheckIn ? (
                        <>
                            <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-black">Check In Now</span>
                            <svg className="h-5 w-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        </>
                    ) : (
                        <>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Next Check-In: {formatCountdown(countdown)}</span>
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

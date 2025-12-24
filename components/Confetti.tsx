'use client';

import { useEffect, useState } from 'react';

interface ConfettiPiece {
    id: number;
    left: number;
    backgroundColor: string;
    animationDuration: number;
    animationDelay: number;
}

export default function Confetti({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (show) {
            const colors = ['#0052FF', '#8A2BE2', '#00D4FF', '#FF6B9D', '#FFD700'];
            const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                animationDuration: 2 + Math.random() * 2,
                animationDelay: Math.random() * 0.5,
            }));

            setConfetti(pieces);

            // Clear confetti after animation
            const timer = setTimeout(() => {
                setConfetti([]);
                onComplete?.();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show || confetti.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti absolute"
                    style={{
                        left: `${piece.left}%`,
                        backgroundColor: piece.backgroundColor,
                        animationDuration: `${piece.animationDuration}s`,
                        animationDelay: `${piece.animationDelay}s`,
                    }}
                />
            ))}
        </div>
    );
}

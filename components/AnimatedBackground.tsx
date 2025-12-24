'use client';

import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate floating particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {/* Floating particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-base-blue rounded-full opacity-30"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animation: `float 6s ease-in-out infinite`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}

            {/* Gradient orbs */}
            <div
                className="absolute top-20 left-10 w-96 h-96 bg-base-blue rounded-full opacity-10 blur-3xl"
                style={{ animation: 'float 8s ease-in-out infinite' }}
            />
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"
                style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }}
            />
        </div>
    );
}

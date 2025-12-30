'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    decimals?: number;
}

export default function AnimatedCounter({ value, duration = 2000, decimals = 0 }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const startValue = 0;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = startValue + (value - startValue) * easeOutQuart;

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return (
        <span>
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
        </span>
    );
}

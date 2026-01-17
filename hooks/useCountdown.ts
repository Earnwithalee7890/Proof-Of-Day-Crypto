'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountdownOptions {
    interval?: number;
    onComplete?: () => void;
}

interface UseCountdownReturn {
    seconds: number;
    isRunning: boolean;
    start: (initialSeconds: number) => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    formatted: string;
}

/**
 * Hook for countdown timer functionality
 */
export function useCountdown(options: UseCountdownOptions = {}): UseCountdownReturn {
    const { interval = 1000, onComplete } = options;

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const initialSecondsRef = useRef(0);

    const clearTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const start = (initialSeconds: number) => {
        clearTimer();
        initialSecondsRef.current = initialSeconds;
        setSeconds(initialSeconds);
        setIsRunning(true);
    };

    const pause = () => {
        clearTimer();
        setIsRunning(false);
    };

    const resume = () => {
        if (seconds > 0) {
            setIsRunning(true);
        }
    };

    const reset = () => {
        clearTimer();
        setSeconds(initialSecondsRef.current);
        setIsRunning(false);
    };

    // Format seconds to MM:SS
    const formatted = `${Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearTimer();
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, interval);

        return clearTimer;
    }, [isRunning, interval, onComplete]);

    // Cleanup on unmount
    useEffect(() => {
        return clearTimer;
    }, []);

    return {
        seconds,
        isRunning,
        start,
        pause,
        resume,
        reset,
        formatted,
    };
}

export default useCountdown;

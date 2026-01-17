'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollPosition {
    x: number;
    y: number;
    direction: 'up' | 'down' | null;
    isAtTop: boolean;
    isAtBottom: boolean;
    scrollPercentage: number;
}

/**
 * Hook to track scroll position with direction detection
 */
export function useScrollPosition(): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        direction: null,
        isAtTop: true,
        isAtBottom: false,
        scrollPercentage: 0,
    });

    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

        setScrollPosition({
            x: currentScrollX,
            y: currentScrollY,
            direction: currentScrollY > lastScrollY.current ? 'down' : 'up',
            isAtTop: currentScrollY <= 0,
            isAtBottom: currentScrollY >= docHeight - 1,
            scrollPercentage: Math.min(100, Math.max(0, scrollPercentage)),
        });

        lastScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return scrollPosition;
}

export default useScrollPosition;

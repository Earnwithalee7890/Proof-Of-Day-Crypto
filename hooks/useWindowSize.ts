'use client';

import { useState, useEffect, useCallback } from 'react';

interface WindowSize {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

/**
 * Hook to track window dimensions and breakpoints
 */
export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setWindowSize({
            width,
            height,
            isMobile: width < 640,
            isTablet: width >= 640 && width < 1024,
            isDesktop: width >= 1024,
        });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return windowSize;
}

export default useWindowSize;

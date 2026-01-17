'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

/**
 * Hook to observe element intersection with viewport
 */
export function useIntersectionObserver<T extends Element>(
    options: UseIntersectionObserverOptions = {}
): {
    ref: (node: T | null) => void;
    isIntersecting: boolean;
    entry: IntersectionObserverEntry | null;
} {
    const {
        threshold = 0,
        root = null,
        rootMargin = '0px',
        freezeOnceVisible = false,
    } = options;

    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const elementRef = useRef<T | null>(null);
    const frozen = useRef(false);

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);

        if (freezeOnceVisible && entry.isIntersecting) {
            frozen.current = true;
        }
    };

    const ref = useCallback((node: T | null) => {
        elementRef.current = node;
    }, []);

    useEffect(() => {
        const node = elementRef.current;
        const hasIO = !!window.IntersectionObserver;

        if (!hasIO || frozen.current || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [threshold, root, rootMargin]);

    return {
        ref,
        isIntersecting: entry?.isIntersecting ?? false,
        entry,
    };
}

export default useIntersectionObserver;

'use client';

import { useState, useCallback, useTransition } from 'react';

interface AsyncState<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

interface UseAsyncReturn<T, P extends unknown[]> extends AsyncState<T> {
    execute: (...args: P) => Promise<T | null>;
    reset: () => void;
    setData: (data: T | null) => void;
}

/**
 * Hook for handling async operations with loading and error states
 */
export function useAsync<T, P extends unknown[] = []>(
    asyncFunction: (...args: P) => Promise<T>
): UseAsyncReturn<T, P> {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const [, startTransition] = useTransition();

    const execute = useCallback(
        async (...args: P): Promise<T | null> => {
            setState(prev => ({ ...prev, isLoading: true, error: null }));

            try {
                const result = await asyncFunction(...args);
                startTransition(() => {
                    setState({ data: result, isLoading: false, error: null });
                });
                return result;
            } catch (error) {
                const errorObj = error instanceof Error ? error : new Error(String(error));
                startTransition(() => {
                    setState({ data: null, isLoading: false, error: errorObj });
                });
                return null;
            }
        },
        [asyncFunction]
    );

    const reset = useCallback(() => {
        setState({ data: null, isLoading: false, error: null });
    }, []);

    const setData = useCallback((data: T | null) => {
        setState(prev => ({ ...prev, data }));
    }, []);

    return {
        ...state,
        execute,
        reset,
        setData,
    };
}

export default useAsync;

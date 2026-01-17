'use client';

import { useCallback, useRef, useState } from 'react';

interface UseClipboardOptions {
    timeout?: number;
}

interface UseClipboardReturn {
    copy: (text: string) => Promise<boolean>;
    copied: boolean;
    error: Error | null;
}

/**
 * Enhanced hook for clipboard operations with feedback
 */
export function useClipboardEnhanced(options: UseClipboardOptions = {}): UseClipboardReturn {
    const { timeout = 2000 } = options;

    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const copy = useCallback(async (text: string): Promise<boolean> => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        try {
            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (!successful) {
                    throw new Error('Failed to copy text');
                }
            }

            setCopied(true);
            setError(null);

            // Reset copied state after timeout
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, timeout);

            return true;
        } catch (err) {
            const errorObj = err instanceof Error ? err : new Error('Failed to copy');
            setError(errorObj);
            setCopied(false);
            return false;
        }
    }, [timeout]);

    return {
        copy,
        copied,
        error,
    };
}

export default useClipboardEnhanced;

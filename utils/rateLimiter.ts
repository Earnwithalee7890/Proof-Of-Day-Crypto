/**
 * Rate limiter utility for API calls
 */

interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

interface RateLimitState {
    requests: number;
    windowStart: number;
}

class RateLimiter {
    private limits: Map<string, RateLimitState> = new Map();
    private config: RateLimitConfig;

    constructor(config: RateLimitConfig) {
        this.config = config;
    }

    /**
     * Check if request is allowed and update counter
     */
    checkLimit(key: string): { allowed: boolean; remaining: number; resetIn: number } {
        const now = Date.now();
        let state = this.limits.get(key);

        // Reset window if expired
        if (!state || now - state.windowStart >= this.config.windowMs) {
            state = { requests: 0, windowStart: now };
            this.limits.set(key, state);
        }

        const remaining = Math.max(0, this.config.maxRequests - state.requests);
        const resetIn = this.config.windowMs - (now - state.windowStart);

        if (state.requests >= this.config.maxRequests) {
            return { allowed: false, remaining: 0, resetIn };
        }

        state.requests++;
        return { allowed: true, remaining: remaining - 1, resetIn };
    }

    /**
     * Reset limit for a specific key
     */
    reset(key: string): void {
        this.limits.delete(key);
    }

    /**
     * Clear all limits
     */
    clearAll(): void {
        this.limits.clear();
    }

    /**
     * Get current state for a key
     */
    getState(key: string): RateLimitState | undefined {
        return this.limits.get(key);
    }
}

// Pre-configured rate limiters
export const apiRateLimiter = new RateLimiter({
    maxRequests: 100,
    windowMs: 60 * 1000, // 100 requests per minute
});

export const authRateLimiter = new RateLimiter({
    maxRequests: 5,
    windowMs: 60 * 1000, // 5 auth attempts per minute
});

export const searchRateLimiter = new RateLimiter({
    maxRequests: 20,
    windowMs: 60 * 1000, // 20 searches per minute
});

// Export class for custom instances
export { RateLimiter };
export type { RateLimitConfig, RateLimitState };

/**
 * Decorator function to rate limit async functions
 */
export function withRateLimit<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    limiter: RateLimiter,
    keyFn: (...args: Parameters<T>) => string
): T {
    return (async (...args: Parameters<T>) => {
        const key = keyFn(...args);
        const { allowed, resetIn } = limiter.checkLimit(key);

        if (!allowed) {
            throw new Error(`Rate limit exceeded. Try again in ${Math.ceil(resetIn / 1000)} seconds.`);
        }

        return fn(...args);
    }) as T;
}

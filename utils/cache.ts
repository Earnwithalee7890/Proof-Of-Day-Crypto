/**
 * In-memory caching utility with TTL support
 */

interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

class Cache<T = unknown> {
    private store: Map<string, CacheEntry<T>> = new Map();
    private defaultTtlMs: number;

    constructor(defaultTtlMs: number = 5 * 60 * 1000) { // Default 5 minutes
        this.defaultTtlMs = defaultTtlMs;
    }

    /**
     * Set a value in the cache
     */
    set(key: string, value: T, ttlMs?: number): void {
        const expiresAt = Date.now() + (ttlMs ?? this.defaultTtlMs);
        this.store.set(key, { value, expiresAt });
    }

    /**
     * Get a value from the cache
     */
    get(key: string): T | undefined {
        const entry = this.store.get(key);

        if (!entry) {
            return undefined;
        }

        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return undefined;
        }

        return entry.value;
    }

    /**
     * Check if a key exists and is not expired
     */
    has(key: string): boolean {
        const value = this.get(key);
        return value !== undefined;
    }

    /**
     * Delete a key from the cache
     */
    delete(key: string): boolean {
        return this.store.delete(key);
    }

    /**
     * Clear all entries from the cache
     */
    clear(): void {
        this.store.clear();
    }

    /**
     * Get or set a value using a factory function
     */
    async getOrSet(
        key: string,
        factory: () => Promise<T>,
        ttlMs?: number
    ): Promise<T> {
        const cached = this.get(key);
        if (cached !== undefined) {
            return cached;
        }

        const value = await factory();
        this.set(key, value, ttlMs);
        return value;
    }

    /**
     * Get cache size
     */
    size(): number {
        return this.store.size;
    }

    /**
     * Clean up expired entries
     */
    cleanup(): number {
        let cleaned = 0;
        const now = Date.now();

        for (const [key, entry] of this.store.entries()) {
            if (now > entry.expiresAt) {
                this.store.delete(key);
                cleaned++;
            }
        }

        return cleaned;
    }
}

// Export singleton instances for different cache types
export const apiCache = new Cache(2 * 60 * 1000); // 2 minutes for API responses
export const userCache = new Cache(10 * 60 * 1000); // 10 minutes for user data
export const staticCache = new Cache(60 * 60 * 1000); // 1 hour for static data

// Export the class for custom instances
export { Cache };

// Helper to create cache key from object
export function createCacheKey(prefix: string, params: Record<string, unknown>): string {
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${String(params[key])}`)
        .join('&');
    return `${prefix}:${sortedParams}`;
}

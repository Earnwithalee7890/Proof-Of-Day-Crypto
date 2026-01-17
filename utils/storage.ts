/**
 * Storage utility for consistent localStorage operations
 */

const STORAGE_PREFIX = 'pod_';

/**
 * Get item from localStorage with type safety
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const item = localStorage.getItem(STORAGE_PREFIX + key);
        if (item === null) return defaultValue;
        return JSON.parse(item) as T;
    } catch (error) {
        console.warn(`Error reading from localStorage: ${key}`, error);
        return defaultValue;
    }
}

/**
 * Set item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error writing to localStorage: ${key}`, error);
    }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
        console.warn(`Error removing from localStorage: ${key}`, error);
    }
}

/**
 * Clear all app-related items from localStorage
 */
export function clearAppStorage(): void {
    if (typeof window === 'undefined') return;

    try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(STORAGE_PREFIX));
        keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.warn('Error clearing localStorage', error);
    }
}

/**
 * Get all app-related storage keys
 */
export function getAppStorageKeys(): string[] {
    if (typeof window === 'undefined') return [];

    try {
        return Object.keys(localStorage)
            .filter(key => key.startsWith(STORAGE_PREFIX))
            .map(key => key.replace(STORAGE_PREFIX, ''));
    } catch {
        return [];
    }
}

/**
 * Get storage size in bytes
 */
export function getStorageSize(): number {
    if (typeof window === 'undefined') return 0;

    try {
        let total = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length * 2; // UTF-16 characters
            }
        }
        return total;
    } catch {
        return 0;
    }
}

/**
 * Session storage helpers
 */
export const sessionStorage = {
    get<T>(key: string, defaultValue: T): T {
        if (typeof window === 'undefined') return defaultValue;
        try {
            const item = window.sessionStorage.getItem(STORAGE_PREFIX + key);
            if (item === null) return defaultValue;
            return JSON.parse(item) as T;
        } catch {
            return defaultValue;
        }
    },

    set<T>(key: string, value: T): void {
        if (typeof window === 'undefined') return;
        try {
            window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error writing to sessionStorage: ${key}`, error);
        }
    },

    remove(key: string): void {
        if (typeof window === 'undefined') return;
        try {
            window.sessionStorage.removeItem(STORAGE_PREFIX + key);
        } catch {
            // Ignore
        }
    },

    clear(): void {
        if (typeof window === 'undefined') return;
        try {
            const keys = Object.keys(window.sessionStorage).filter(key => key.startsWith(STORAGE_PREFIX));
            keys.forEach(key => window.sessionStorage.removeItem(key));
        } catch {
            // Ignore
        }
    },
};

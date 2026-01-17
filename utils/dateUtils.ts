/**
 * Date and time utility functions for enhanced formatting
 */

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
    const now = new Date();
    const targetDate = new Date(date);
    const diffMs = now.getTime() - targetDate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
}

/**
 * Format date to human readable string
 */
export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    const targetDate = new Date(date);
    return targetDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options,
    });
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string | number): string {
    const targetDate = new Date(date);
    return targetDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Get time until a future date
 */
export function getTimeUntil(futureDate: Date | string | number): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
} {
    const now = new Date().getTime();
    const target = new Date(futureDate).getTime();
    const diff = Math.max(0, target - now);

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        total: diff,
    };
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string | number): boolean {
    const today = new Date();
    const targetDate = new Date(date);
    return (
        targetDate.getDate() === today.getDate() &&
        targetDate.getMonth() === today.getMonth() &&
        targetDate.getFullYear() === today.getFullYear()
    );
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const targetDate = new Date(date);
    return (
        targetDate.getDate() === yesterday.getDate() &&
        targetDate.getMonth() === yesterday.getMonth() &&
        targetDate.getFullYear() === yesterday.getFullYear()
    );
}

/**
 * Get start of day
 */
export function startOfDay(date: Date = new Date()): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Get end of day
 */
export function endOfDay(date: Date = new Date()): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Get days between two dates
 */
export function daysBetween(start: Date, end: Date): number {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

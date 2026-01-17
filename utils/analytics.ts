/**
 * Analytics utility functions for tracking user behavior and app metrics
 */

export type EventCategory = 'engagement' | 'conversion' | 'navigation' | 'error' | 'performance';

export interface AnalyticsEvent {
    category: EventCategory;
    action: string;
    label?: string;
    value?: number;
    timestamp: number;
}

// Queue events for batch processing
const eventQueue: AnalyticsEvent[] = [];

/**
 * Track a custom analytics event
 */
export function trackEvent(
    category: EventCategory,
    action: string,
    label?: string,
    value?: number
): void {
    const event: AnalyticsEvent = {
        category,
        action,
        label,
        value,
        timestamp: Date.now(),
    };

    eventQueue.push(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', event);
    }
}

/**
 * Track page view
 */
export function trackPageView(pageName: string, additionalData?: Record<string, string>): void {
    trackEvent('navigation', 'page_view', pageName);

    if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
            trackEvent('navigation', `page_view_${key}`, value);
        });
    }
}

/**
 * Track user engagement
 */
export function trackEngagement(action: string, details?: string): void {
    trackEvent('engagement', action, details);
}

/**
 * Track errors for debugging
 */
export function trackError(errorName: string, errorMessage: string, stack?: string): void {
    trackEvent('error', errorName, errorMessage);

    if (stack && process.env.NODE_ENV === 'development') {
        console.error('[Analytics Error]', stack);
    }
}

/**
 * Track performance metrics
 */
export function trackPerformance(metric: string, durationMs: number): void {
    trackEvent('performance', metric, undefined, durationMs);
}

/**
 * Get all queued events
 */
export function getEventQueue(): AnalyticsEvent[] {
    return [...eventQueue];
}

/**
 * Clear event queue after processing
 */
export function clearEventQueue(): void {
    eventQueue.length = 0;
}

/**
 * Measure function execution time
 */
export function measurePerformance<T>(
    name: string,
    fn: () => T
): T {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;
    trackPerformance(name, duration);
    return result;
}

/**
 * Measure async function execution time
 */
export async function measurePerformanceAsync<T>(
    name: string,
    fn: () => Promise<T>
): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;
    trackPerformance(name, duration);
    return result;
}

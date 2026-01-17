/**
 * String manipulation utility functions
 */

/**
 * Capitalize first letter of each word
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Slugify string (e.g. "Hello World" -> "hello-world")
 */
export function slugify(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(str: string): string {
  if (!str) return '';
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Convert snake_case to Title Case
 */
export function snakeToTitle(str: string): string {
  if (!str) return '';
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate random string
 */
export function randomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mask string (e.g. email or phone)
 */
export function maskString(str: string, visibleStart: number = 2, visibleEnd: number = 2): string {
  if (!str || str.length <= visibleStart + visibleEnd) return str;
  return (
    str.substring(0, visibleStart) +
    '*'.repeat(str.length - visibleStart - visibleEnd) +
    str.substring(str.length - visibleEnd)
  );
}

/**
 * Count words in string
 */
export function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
}

/**
 * Reading time estimation (minutes)
 */
export function getReadingTime(text: string, wpm: number = 200): number {
  const words = countWords(text);
  return Math.ceil(words / wpm);
}

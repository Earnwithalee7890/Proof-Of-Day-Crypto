/**
 * Common validation utility functions
 */

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
export const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate username (alphanumeric + underscore, 3-20 chars)
 */
export function isValidUsername(username: string): boolean {
  return usernameRegex.test(username);
}

/**
 * Password strength checker
 * Returns score 0-4
 */
export function getPasswordStrength(password: string): {
  score: number;
  checks: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
} {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length - 1; // 0-4 range (length is prerequisite)

  return {
    score: Math.max(0, score),
    checks,
  };
}

/**
 * Validate numeric input is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validate file size
 */
export function isValidFileSize(size: number, maxSizeMB: number): boolean {
  return size <= maxSizeMB * 1024 * 1024;
}

/**
 * Validate file type
 */
export function isValidFileType(type: string, allowedTypes: string[]): boolean {
  return allowedTypes.some(t => {
    if (t.endsWith('/*')) {
      const mainType = t.split('/')[0];
      return type.startsWith(`${mainType}/`);
    }
    return type === t;
  });
}

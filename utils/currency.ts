/**
 * Currency and number formatting utilities
 */

/**
 * Format number as currency
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format large numbers with suffix (e.g. 1.5K, 2M)
 */
export function formatCompactNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format crypto amount with dynamic precision
 */
export function formatCryptoAmount(amount: number, symbol?: string): string {
  let formatted: string;

  if (amount === 0) {
    formatted = '0';
  } else if (amount < 0.000001) {
    formatted = '< 0.000001';
  } else if (amount < 1) {
    formatted = amount.toPrecision(4);
  } else {
    formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return symbol ? `${formatted} ${symbol}` : formatted;
}

/**
 * Convert cents to dollars (or other decimal currency)
 */
export function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Convert dollars to cents
 */
export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

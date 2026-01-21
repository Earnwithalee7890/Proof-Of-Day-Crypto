// Number formatting and calculation utilities
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * t;

export const roundTo = (value: number, decimals: number): number =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;

export const formatCompact = (value: number): string => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toString();
};

export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const randomInt = (min: number, max: number): number =>
  Math.floor(randomBetween(min, max + 1));

export const percentage = (value: number, total: number): number =>
  total === 0 ? 0 : (value / total) * 100;

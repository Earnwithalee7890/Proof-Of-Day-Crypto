// Async utilities for better control flow
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]);
};

export const promiseAllSettled = async <T>(
  promises: Promise<T>[]
): Promise<{ fulfilled: Awaited<T>[]; rejected: Error[] }> => {
  const results = await Promise.allSettled(promises);
  return {
    fulfilled: results
      .filter((r): r is PromiseFulfilledResult<Awaited<T>> => r.status === 'fulfilled')
      .map(r => r.value),
    rejected: results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map(r => r.reason),
  };
};

export const createDeferredPromise = <T>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

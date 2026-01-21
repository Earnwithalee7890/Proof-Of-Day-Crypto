import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useRenderCount = (): number => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
};

export const useIsFirstRender = (): boolean => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return false;
};

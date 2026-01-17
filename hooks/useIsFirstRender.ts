'use client';

import { useRef } from 'react';

/**
 * Hook to determine if it is the first render
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return false;
}

export default useIsFirstRender;

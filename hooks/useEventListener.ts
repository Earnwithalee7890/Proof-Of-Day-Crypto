'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook that manages event listeners on DOM elements
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: HTMLElement | Window | null
): void {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: WindowEventMap[K]) => void>(handler);

  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Define the listening target
      const targetElement: HTMLElement | Window | null = element || (typeof window !== 'undefined' ? window : null);

      if (!(targetElement && targetElement.addEventListener)) {
        return;
      }

      // Create event listener that calls handler function stored in ref
      const eventListener: typeof handler = (event) => savedHandler.current(event);

      targetElement.addEventListener(eventName, eventListener as EventListener);

      // Remove event listener on cleanup
      return () => {
        targetElement.removeEventListener(eventName, eventListener as EventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export default useEventListener;

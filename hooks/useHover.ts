import { useCallback, useRef, useState } from 'react';

interface HoverState {
  isHovered: boolean;
  ref: React.RefObject<HTMLElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const useHover = <T extends HTMLElement = HTMLElement>(): HoverState => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    isHovered,
    ref: ref as React.RefObject<HTMLElement>,
    onMouseEnter,
    onMouseLeave
  };
};

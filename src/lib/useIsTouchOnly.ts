import { useEffect, useState } from 'react';

const QUERY = '(hover: none) and (pointer: coarse)';

export function useIsTouchOnly(): boolean {
  const [isTouchOnly, setIsTouchOnly] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setIsTouchOnly(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouchOnly(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isTouchOnly;
}

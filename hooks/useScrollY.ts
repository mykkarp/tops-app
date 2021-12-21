import { useEffect, useState } from 'react';


export function useScrollY(): number {
  const isBrowser = typeof window !== 'undefined';

  const [scrollY, setScrollY] = useState<number>(0);

  const scrollHandler = () => {
    const currentScrollY = isBrowser ? window.scrollY : 0;
    setScrollY(currentScrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return scrollY;
}
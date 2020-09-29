import { useEffect } from 'react';

export const useEventListener = (
  ref,
  type,
  listener,
  options = { passive: true },
) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener(type, listener, options);

    return () => {
      ref.current.removeEventListener(type, listener);
    };
  }, [type, listener, options]);
};

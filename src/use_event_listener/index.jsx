import { useEffect } from 'react';

export const useEventListener = (
  ref,
  type,
  listener,
  options = { passive: true },
) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.addEventListener(type, listener, options);

    return () => {
      node.removeEventListener(type, listener, options);
    };
  }, [type, listener, options]);
};

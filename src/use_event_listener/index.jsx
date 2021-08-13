import { useEffect, useRef } from 'react';

/**
 * @param ref
 * @param type
 * @param handler
 * @param passive
 * @param capture
 * @param once
 */
export const useEventListener = (
  ref,
  type,
  handler,
  { passive, capture, once } = { passive: true },
) => {
  const handlerRef = useRef(null);
  handlerRef.current = handler;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const listener = (...args) => handlerRef.current(...args);
    const options = { passive, capture, once };

    node.addEventListener(type, listener, options);

    return () => {
      node.removeEventListener(type, listener, options);
    };
  }, [type, ref.current, passive, capture, once]);
};

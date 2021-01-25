import { useEffect, useRef } from 'react';

export const useEventListener = (
  ref,
  type,
  handler,
  { passive, capture, once } = { passive: true },
) => {
  const node = ref.current;
  const handlerRef = useRef(null);

  handlerRef.current = handler;

  useEffect(() => {
    if (!node) return;

    const listener = (...args) => handlerRef.current(...args);
    const options = { passive, capture, once };

    node.addEventListener(type, listener, options);

    return () => {
      node.removeEventListener(type, listener, options);
    };
  }, [type, node, passive, capture, once]);
};

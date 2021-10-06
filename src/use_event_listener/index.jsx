import { useEffect, useRef } from 'react';

/**
 * @function
 * @param {React.RefObject} ref
 * @param {string} type EventListener type
 * @param {function} handler Handler function
 * @param {Boolean} passive EventListener option passive
 * @param {Boolean} capture EventListener option capture
 * @param {Boolean} once EventListener option once
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

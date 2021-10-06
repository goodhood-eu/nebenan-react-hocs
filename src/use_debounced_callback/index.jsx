import debounce from 'lodash/debounce';
import { useEffect, useRef } from 'react';

/**
 * Note: Does not react to `delay` changes
 * @param func
 * @param delay
 * @param deps
 * @return {function}
 */
const useDebouncedCallback = (func, delay, deps = []) => {
  const callback = useRef(null);
  callback.current = func;

  const wrappedRef = useRef(null);
  if (!wrappedRef.current) {
    wrappedRef.current = debounce((...args) => callback.current?.(...args), delay);
  }

  useEffect(() => () => { wrappedRef.current?.cancel(); }, [...deps]);

  return wrappedRef.current;
};

export default useDebouncedCallback;

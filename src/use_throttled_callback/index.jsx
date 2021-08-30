import { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

/**
 * @param func
 * @param delay - in ms
 * @param deps
 * @return {null}
 */
const useThrottledCallback = (func, delay, deps = []) => {
  const callback = useRef(null);
  callback.current = func;

  const wrappedRef = useRef(null);
  if (!wrappedRef.current) {
    wrappedRef.current = throttle((...args) => callback.current?.(...args), delay);
  }

  useEffect(() => () => { wrappedRef.current?.cancel(); }, [...deps]);

  return wrappedRef.current;
};

export default useThrottledCallback;

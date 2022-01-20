import { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

/**
 * @param {function} func
 * @param {number} delay - delay in ms for throttle
 * @param {any[]} deps Array of dependencies for useEffect
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

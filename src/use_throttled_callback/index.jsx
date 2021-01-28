import { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

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

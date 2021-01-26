import { useRef } from 'react';
import throttle from 'lodash/throttle';
import useStableMemo from '../_use_stable_memo';

const useThrottledCallback = (func, delay, deps = []) => {
  const callback = useRef(null);
  callback.current = func;

  return useStableMemo(
    () => throttle((...args) => callback.current?.(...args), delay),
    (instance) => { instance.cancel(); },
    [delay, ...deps],
  );
};

export default useThrottledCallback;

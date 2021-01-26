import debounce from 'lodash/debounce';
import { useRef } from 'react';
import useStableMemo from '../_use_stable_memo';

const useDebouncedCallback = (func, delay, deps = []) => {
  const callback = useRef(null);
  callback.current = func;

  return useStableMemo(
    () => debounce((...args) => callback.current?.(...args), delay),
    (instance) => { instance.cancel(); },
    [delay, ...deps],
  );
};

export default useDebouncedCallback;

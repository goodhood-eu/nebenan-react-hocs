import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';

const useStableMemo = (fn, teardownFn, deps) => {
  const firstRun = useRef(true);
  const [memorized, setMemorized] = useState(() => fn());

  useEffect(() => {
    let localMemorized;

    if (firstRun.current) {
      firstRun.current = false;
      localMemorized = memorized;
    } else {
      localMemorized = fn();
      setMemorized(() => localMemorized);
    }

    return teardownFn.bind(undefined, localMemorized);
  }, deps);

  return memorized;
};

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

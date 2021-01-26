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

export default useStableMemo;

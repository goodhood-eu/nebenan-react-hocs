import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';

const useThrottledCallback = (func, delay) => {
  const [instance, setInstance] = useState(undefined);

  useEffect(() => {
    const throttled = throttle(func, delay);

    setInstance(throttled);

    return () => { throttled.flush(); };
  }, [func, delay]);

  return instance;
};

export default useThrottledCallback;

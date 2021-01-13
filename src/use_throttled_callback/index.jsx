import throttle from 'lodash/throttle';
import { useMemo } from 'react';

const useThrottledCallback = (func, delay) => (
  useMemo(
    () => throttle(func, delay),
    [func, delay],
  )
);

export default useThrottledCallback;

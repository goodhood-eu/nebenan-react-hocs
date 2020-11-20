import debounce from 'lodash/debounce';
import { useMemo } from 'react';

const useDebouncedCallback = (func, delay) => (
  useMemo(
    () => debounce(func, delay),
    [func, delay],
  )
);

export default useDebouncedCallback;

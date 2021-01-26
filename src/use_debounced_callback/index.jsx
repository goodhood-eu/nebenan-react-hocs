import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

const useDebouncedCallback = (func, delay, deps = []) => {
  const callback = useRef(null);
  callback.current = func;

  // TODO: don't use memo (check react documentation)
  const wrapped = useMemo(() => (
    debounce((...args) => callback.current?.(...args), delay)
  ), [delay]);

  useEffect(() => () => { wrapped?.cancel(); }, [wrapped, deps]);

  return wrapped;
};

export default useDebouncedCallback;

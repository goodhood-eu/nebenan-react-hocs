import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

const useDebouncedCallback = (func, delay) => {
  const [instance, setInstance] = useState(undefined);

  useEffect(() => {
    const debounced = debounce(func, delay);

    setInstance(debounced);

    return () => { debounced.flush(); };
  }, [func, delay]);

  return instance;
};

export default useDebouncedCallback;

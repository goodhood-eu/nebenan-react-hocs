import { useEffect, useRef } from 'react';

const useMounted = (deps = []) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, [...deps]);

  return isMounted;
};

export default useMounted;

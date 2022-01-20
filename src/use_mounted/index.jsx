import { useEffect, useRef } from 'react';

/**
 * @return {React.MutableRefObject<boolean>}
 */
const useMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  return isMounted;
};

export default useMounted;

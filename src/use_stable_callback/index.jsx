import { useCallback, useRef } from 'react';

/**
 * @param {function} callback
 * @return {function}
 */
const useStableCallback = (callback) => {
  const ref = useRef(null);
  ref.current = callback;

  return useCallback(
    (...args) => ref.current?.(...args),
    [],
  );
};

export default useStableCallback;

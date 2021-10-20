import { useEffect, useRef } from 'react';
import useStableCallback from '../use_stable_callback';

/**
 * @param {function} fn function to be called once
 * @param {any[]} resetDeps array of dependencies for resetting 'once' state
 * @returns {function} callback with stable identity
 */
const useOnceCallback = (fn, resetDeps = []) => {
  const wasCalledRef = useRef(false);

  useEffect(() => {
    wasCalledRef.current = false;
  }, resetDeps);

  return useStableCallback((...args) => {
    if (wasCalledRef.current) return;

    fn(...args);
    wasCalledRef.current = true;
  });
};

export default useOnceCallback;

import { useCallback } from 'react';
import useMounted from '../use_mounted';

const usePromiseGuard = () => {
  const isMounted = useMounted();

  return useCallback((getPromise) => new Promise((resolve, reject) => {
    getPromise()
      .then((result) => {
        if (isMounted.current) resolve(result);
      })
      .catch((result) => {
        if (isMounted.current) reject(result);
      });
  }), []);
};

export default usePromiseGuard;

import useMounted from '../use_mounted';

const usePromiseGuard = (deps) => {
  const isMounted = useMounted(deps);

  const execute = (getPromise) => new Promise((resolve, reject) => {
    getPromise(resolve, reject)
      .then((result) => {
        if (isMounted.current) resolve(result);
      })
      .catch((result) => {
        if (isMounted.current) reject(result);
      });
  });

  return execute;
};

export default usePromiseGuard;

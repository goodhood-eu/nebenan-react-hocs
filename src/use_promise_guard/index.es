import useMounted from '../use_mounted';

const usePromiseGuard = () => {
  const isMounted = useMounted();

  const execute = (getPromise) => new Promise((resolve, reject) => {
    getPromise()
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

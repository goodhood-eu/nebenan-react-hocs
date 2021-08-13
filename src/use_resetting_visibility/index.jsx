import { useEffect, useState } from 'react';

/**
 * @param timeout
 * @return {Array<boolean, function>} Current status and Toggle function
 */
const useResettingVisibility = (timeout) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(setVisibility.bind(undefined, false), timeout);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return [isVisible, setVisibility];
};

export default useResettingVisibility;

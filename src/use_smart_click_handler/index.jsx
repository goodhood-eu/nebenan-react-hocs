import { useHistory } from 'react-router';
import { stripOriginFromUrl } from 'nebenan-helpers/lib/routes';
import { useCallback } from 'react';

/**
 * @param {function} callback
 * @return {function}
 */
const useSmartClickHandler = (callback) => {
  const history = useHistory();

  return useCallback((event) => {
    const { target } = event;
    const href = target.getAttribute('href');
    const isLink = target.tagName === 'A';

    if (isLink && href) {
      event.preventDefault();
      const isSameDomain = href.startsWith(global.location.origin);
      const path = stripOriginFromUrl(href, global.location.origin);
      if (isSameDomain) history.push(path);
      else global.open(href, undefined, 'noopener noreferrer');
      return;
    }

    callback();
  }, [history, callback]);
};

export default useSmartClickHandler;

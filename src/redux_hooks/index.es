import { useMemo } from 'react';

import { bindActionCreators } from 'redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


export const useActions = (actions, deps) => {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((action) => bindActionCreators(action, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
};

export const useShallowEqualSelector = (selector) => useSelector(selector, shallowEqual);

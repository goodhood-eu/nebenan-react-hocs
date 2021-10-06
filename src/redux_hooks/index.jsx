import { useMemo } from 'react';

import { bindActionCreators as bind } from 'redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

/**
 * @function
 * @param actions {function | function[]} array of functions or one single function
 * @param deps
 * @return {function | function[]} array of functions or one single function wrapped with dispatch
 */
export const useActions = (actions, deps) => {
  const dispatch = useDispatch();
  return useMemo(() => {
    if (Array.isArray(actions)) return actions.map((action) => bind(action, dispatch));
    return bind(actions, dispatch);
  }, deps ? [dispatch, ...deps] : [dispatch]);
};

export const useShallowEqualSelector = (selector) => useSelector(selector, shallowEqual);

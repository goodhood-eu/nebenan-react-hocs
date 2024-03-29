import { getDisplayName, getForwardedComponent } from '../utils';

/**
 * @param {React.Component} Component
 * @return {React.ForwardRefExoticComponent}
 */
const proxyRef = (Component) => (
  getForwardedComponent(getDisplayName('proxyRef', Component), Component)
);

/**
 * @function
 * @param {React.RefObject} ref
 * @param {function} getterFn
 * @return {function}
 */
export const getMergedRef = (ref, getterFn) => {
  // ref exists and created via createRef
  if (ref && typeof ref !== 'function') {
    getterFn(ref);
    return ref;
  }

  // ref doesn't exist or is a function
  return (el) => {
    getterFn({ current: el });
    if (ref) ref(el);
  };
};

export default proxyRef;

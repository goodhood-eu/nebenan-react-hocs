import { getDisplayName, getForwardedComponent } from '../utils';

const proxyRef = (Component) => (
  getForwardedComponent(getDisplayName('proxyRef', Component), Component)
);

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

import { getDisplayName, getForwardedComponent } from '../utils';

const proxyRef = (Component) => (
  getForwardedComponent(getDisplayName('proxyRef', Component), Component)
);

export const getMergedRef = (ref, getterFn) => {
  if (typeof ref !== 'function') {
    getterFn(ref);
    return ref;
  }

  return (el) => {
    getterFn({ current: el });
    ref(el);
  };
};

export default proxyRef;

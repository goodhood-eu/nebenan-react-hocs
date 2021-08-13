import { forwardRef } from 'react';

/**
 * @param wrapper
 * @param Component
 * @return {string}
 */
export const getDisplayName = (wrapper, Component) => {
  const name = Component.displayName || Component.name || 'Component';
  return `${wrapper}(${name})`;
};

/**
 * @param displayName
 * @param Component
 * @return {React.ForwardRefExoticComponent}
 */
export const getForwardedComponent = (displayName, Component) => {
  const WrappedComponent = (props, ref) => <Component {...props} forwardedRef={ref} />;
  WrappedComponent.displayName = displayName;

  return forwardRef(WrappedComponent);
};

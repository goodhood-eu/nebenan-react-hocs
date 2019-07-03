import React, { forwardRef } from 'react';

export const getDisplayName = (wrapper, Component) => {
  const name = Component.displayName || Component.name || 'Component';
  return `${wrapper}(${name})`;
};

export const getForwardedComponent = (displayName, Component) => {
  const WrappedComponent = (props, ref) => <Component {...props} forwardedRef={ref} />;
  WrappedComponent.displayName = displayName;

  return forwardRef(WrappedComponent);
};

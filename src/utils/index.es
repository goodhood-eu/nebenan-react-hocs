import React, { forwardRef } from 'react';

export const getDisplayName = (wrapper, Component) => {
  const name = Component.displayName || Component.name || 'Component';
  return `${wrapper}(${name})`;
};

export const proxyRef = (displayName, NewComponent, options = {}) => {
  if (!options.forwardRef) {
    NewComponent.displayName = displayName;
    return NewComponent;
  }

  const WrappedComponent = (props, ref) => <NewComponent {...props} forwardedRef={ref} />;
  WrappedComponent.displayName = displayName;

  return forwardRef(WrappedComponent);
};

import { forwardRef } from 'react';

/**
 * @function
 * @param {string} wrapper - Wrapper name
 * @param { React.Component } Component - React Component
 * @return {string} Combined string
 */
export const getDisplayName = (wrapper, Component) => {
  const name = Component.displayName || Component.name || 'Component';
  return `${wrapper}(${name})`;
};

/**
 * @function
 * @param {string} displayName - Component's displayName
 * @param {React.Component} Component - Target component
 * @return {React.Component} The same component with new displayName and forwardedRef
 */
export const getForwardedComponent = (displayName, Component) => {
  const WrappedComponent = (props, ref) => <Component {...props} forwardedRef={ref} />;
  WrappedComponent.displayName = displayName;

  return forwardRef(WrappedComponent);
};

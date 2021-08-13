import { forwardRef } from 'react';

/**
 * @type Function
 * @param {string} wrapper
 * @param { React.Component } Component - React Component
 * @return {string} Combined string
 */
export const getDisplayName = (wrapper, Component) => {
  const name = Component.displayName || Component.name || 'Component';
  return `${wrapper}(${name})`;
};

/**
 * @type Function
 * @param {string} displayName
 * @param {React.Component} Component
 * @return {React.Component} The same component with new displayName
 */
export const getForwardedComponent = (displayName, Component) => {
  const WrappedComponent = (props, ref) => <Component {...props} forwardedRef={ref} />;
  WrappedComponent.displayName = displayName;

  return forwardRef(WrappedComponent);
};

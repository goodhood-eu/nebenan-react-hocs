import { connect } from 'react-redux';
import { getDisplayName, getForwardedComponent } from '../utils';

/**
 * @param {function} mapStateToProps
 * @param {function} mapDispatchToProps
 * @param {object} mergeProps
 * @param {object} opts
 * @return { React.Component } Wrapped with Redux.Connect component
 */
const proxyConnect = (mapStateToProps, mapDispatchToProps, mergeProps, opts) => {
  const options = { ...opts, forwardRef: true };

  const connectFunc = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options,
  );

  return (Component) => {
    const displayName = getDisplayName('proxyConnect', Component);
    const WrappedComponent = getForwardedComponent(displayName, Component);

    return connectFunc(WrappedComponent);
  };
};

export default proxyConnect;

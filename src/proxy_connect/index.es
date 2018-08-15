import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


export default (mapStateToProps, mapDispatchToProps, mergeProps, opts) => {
  const options = { ...opts, withRef: true };

  const connectFunc = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options,
  );

  return (methods, WrappedComponent) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const ConnectedComponent = connectFunc(WrappedComponent);
    const componentMethods = {};

    const getMethod = (method) => (
      function(...args) {
        return this.proxiedInstance[method].call(this.proxiedInstance, ...args);
      }
    );

    class ProxyConnect extends PureComponent {
      constructor(props) {
        super(props);
        methods.forEach((method) => { this[method] = this[method].bind(this); });
      }

      componentDidMount() {
        this.proxiedInstance = this.proxiedRef.getWrappedInstance();
      }

      getWrappedInstance() {
        return this.proxiedInstance;
      }

      render() {
        return <ConnectedComponent {...this.props} ref={(el) => { this.proxiedRef = el; }} />;
      }
    }

    ProxyConnect.displayName = `ProxyConnect(${displayName})`;
    ProxyConnect.WrappedComponent = ConnectedComponent;

    methods.forEach((method) => { componentMethods[method] = getMethod(method); });
    Object.assign(ProxyConnect.prototype, componentMethods);

    return ProxyConnect;
  };
};

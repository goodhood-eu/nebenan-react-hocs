import React, { PureComponent } from 'react';


export default (methods, WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const componentMethods = {};

  const getMethod = (method) => (
    function(...args) {
      const instance = this.proxiedRef[method] ? this.proxiedRef : this.proxiedInstance;
      return instance[method].call(instance, ...args);
    }
  );

  class ProxyComponent extends PureComponent {
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
      return <WrappedComponent {...this.props} ref={(el) => { this.proxiedRef = el; }} />;
    }
  }

  ProxyComponent.displayName = `ProxyComponent(${displayName})`;
  ProxyComponent.WrappedComponent = WrappedComponent;

  methods.forEach((method) => { componentMethods[method] = getMethod(method); });
  Object.assign(ProxyComponent.prototype, componentMethods);

  return ProxyComponent;
};

import React, { PureComponent } from 'react';
import { getDisplayName } from '../utils';


const mergeMethods = (methods, Component) => {
  const componentMethods = {};
  const displayName = getDisplayName('mergeMethods', Component);

  const getMethod = (method) => (
    function(...args) {
      const instance = this.ref[method] ? this.ref : this.deepRef;
      return instance[method].call(instance, ...args);
    }
  );

  class ProxyComponent extends PureComponent {
    constructor(props) {
      super(props);
      methods.forEach((method) => { this[method] = this[method].bind(this); });
    }

    componentDidMount() {
      this.deepRef = this.ref.getNestedRef();
    }

    getRef() {
      return this.ref;
    }

    getNestedRef() {
      return this.deepRef;
    }

    render() {
      return <Component {...this.props} ref={(el) => { this.ref = el; }} />;
    }
  }

  ProxyComponent.displayName = displayName;

  methods.forEach((method) => { componentMethods[method] = getMethod(method); });
  Object.assign(ProxyComponent.prototype, componentMethods);

  return ProxyComponent;
};

export default mergeMethods;

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { getDisplayName } from '../utils';


const mergeMethods = (methods, Component) => {
  const displayName = getDisplayName('mergeMethods', Component);

  const ProxyComponent = (props, ref) => {
    const selfRef = useRef();

    const getHandle = (name) => (...args) => {
      const { current: that } = selfRef;
      const instance = that[name] ? that : that.getNestedRef();
      return instance[name].call(instance, ...args);
    };

    useImperativeHandle(ref, () => ({
      ...methods.reduce((acc, name) => ({ ...acc, [name]: getHandle(name) }), {}),
      getRef: () => selfRef.current,
      getNestedRef: () => selfRef.current.getNestedRef(),
    }));

    return <Component {...props} ref={selfRef} />;
  };

  ProxyComponent.displayName = displayName;
  return forwardRef(ProxyComponent);
};

export default mergeMethods;

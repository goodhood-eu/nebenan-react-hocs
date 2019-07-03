import React from 'react';
import { connect } from 'react-redux';
import { proxyRef } from '../utils';


const mapStateToProps = ({ experiments }) => ({ experiments });

const makeExperiment = (name, variations, variationProps, options) => {
  const Experiment = ({ experiments, forwardedRef }) => {
    const id = experiments[name];
    const Component = variations[id];
    const componentProps = variationProps[id];
    return <Component {...componentProps} ref={forwardedRef} />;
  };

  const displayName = `makeExperiment(${name})`;
  const WrappedComponent = connect(mapStateToProps)(Experiment);

  return proxyRef(displayName, WrappedComponent, options);
};

export default makeExperiment;

import { connect } from 'react-redux';
import { getDisplayName, getForwardedComponent } from '../utils';


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

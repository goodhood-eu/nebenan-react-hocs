import React from 'react';
import { withRouter } from 'react-router';
import { getDisplayName } from '../utils';


const withHistory = (Component) => {
  const displayName = getDisplayName('withHistory', Component);

  const WithRouter = withRouter(Component);
  const WithRef = ({ ref, ...props }) => {
    if (ref) props.wrappedComponentRef = ref;
    return <WithRouter {...props} />;
  };

  WithRef.displayName = displayName;
  WithRef.WrappedComponent = Component;

  return WithRef;
};

export default withHistory;

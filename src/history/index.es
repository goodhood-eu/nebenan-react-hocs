import React, { forwardRef } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getDisplayName } from '../utils';


const withHistory = (Component) => {
  const displayName = getDisplayName('withHistory', Component);

  const WrappedComponent = ({ forwardedRef, ...props }) => (
    <Component {...props} ref={forwardedRef} />
  );

  const WithRouter = withRouter(WrappedComponent);
  const WithRef = (props, ref) => <WithRouter {...props} forwardedRef={ref} />;

  WithRef.displayName = displayName;
  WithRef.WrappedComponent = Component;

  return forwardRef(WithRef);
};

export default withHistory;

export const historyPropTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
};

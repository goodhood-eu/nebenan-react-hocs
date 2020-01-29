import React, { forwardRef } from 'react';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { getDisplayName } from '../utils';


const withHistory = (Component) => {
  const displayName = getDisplayName('withHistory', Component);

  const WrappedComponent = ({ forwardedRef, ...props }, ref) => {
    const history = useHistory();
    const location = useLocation();

    return (
      <Component history={history} location={location} ref={ref} {...props} />
    );
  };


  WrappedComponent.displayName = displayName;
  WrappedComponent.WrappedComponent = Component;

  return forwardRef(WrappedComponent);
};

export default withHistory;

export const historyPropTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
};

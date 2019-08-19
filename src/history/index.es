import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
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

export const historyPropTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  staticContext: PropTypes.object.isRequired,
};

import { useEffect, useState } from 'react';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { getMedia, media } from 'nebenan-helpers/lib/dom';
import { getDisplayName, getForwardedComponent } from '../utils';

/**
 * Subscription on Resize
 * See nebenan-helpers/lib/dom
 * @return {Boolean} isMobile
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    setIsMobile(!getMedia(window, media.mediaM));
    return eventproxy('resize', () => setIsMobile(!getMedia(window, media.mediaM)));
  }, []);

  return isMobile;
};

/**
 * @param {React.Component} Component
 * @param {Object} options
 * @return {React.Component} AdaptiveComponent
 */
const makeAdaptive = (Component, options = {}) => {
  const AdaptiveComponent = ({ forwardedRef, ...props }) => {
    const isMobile = useIsMobile();
    return <Component {...props} ref={forwardedRef} mobile={isMobile} />;
  };

  const displayName = getDisplayName('makeAdaptive', Component);
  if (options.forwardRef) return getForwardedComponent(displayName, AdaptiveComponent);

  AdaptiveComponent.displayName = displayName;
  return AdaptiveComponent;
};

export default makeAdaptive;

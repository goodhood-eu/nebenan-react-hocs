import React, { PureComponent } from 'react';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { getMedia, media } from 'nebenan-helpers/lib/dom';
import { getDisplayName, getForwardedComponent } from '../utils';


const makeAdaptive = (Component, options = {}) => {
  class AdaptiveComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { isMobile: null };
      this.detectDevice = this.detectDevice.bind(this);
    }

    componentDidMount() {
      this.detectDevice();
      this.stopListeningToResize = eventproxy('resize', this.detectDevice);
    }

    componentWillUnmount() {
      this.stopListeningToResize();
    }

    detectDevice() {
      this.setState({ isMobile: !getMedia(global, media.mediaM) });
    }

    render() {
      const { isMobile } = this.state;
      const { forwardedRef, ...props } = this.props;
      return <Component {...props} ref={forwardedRef} mobile={isMobile} />;
    }
  }

  const displayName = getDisplayName('makeAdaptive', Component);
  if (options.forwardRef) return getForwardedComponent(displayName, AdaptiveComponent);

  AdaptiveComponent.displayName = displayName;
  return AdaptiveComponent;
};

export default makeAdaptive;

import React, { PureComponent } from 'react';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { getMedia, media } from 'nebenan-helpers/lib/dom';


const makeAdaptive = (Component) => (
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
      return <Component {...this.props} mobile={isMobile} />;
    }
  }
);

export default makeAdaptive;

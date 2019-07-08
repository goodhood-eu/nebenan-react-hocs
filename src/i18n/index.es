/* eslint react/no-multi-comp: "off" */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { getDisplayName, getForwardedComponent } from '../utils';


export const connectLocale = (Component, options = {}) => {
  const LocalizedComponent = (proxyProps, context) => {
    const { forwardedRef, ...props } = proxyProps;
    return (
      <Component {...props} t={context.locale.t} locale={context.localeData} ref={forwardedRef} />
    );
  };

  LocalizedComponent.contextTypes = {
    locale: PropTypes.object,
    localeData: PropTypes.object,
  };

  const displayName = getDisplayName('connectLocale', Component);
  if (options.forwardRef) return getForwardedComponent(displayName, LocalizedComponent);

  LocalizedComponent.displayName = displayName;
  return LocalizedComponent;
};


const logMissing = (error) => console.error(error);

class International extends PureComponent {
  constructor(props) {
    super(props);
    const { type, dictionary } = props.locale;

    this.polyglot = new Polyglot({
      phrases: dictionary,
      warn: logMissing,
      locale: type,
    });
    this.polyglot.t = this.polyglot.t.bind(this.polyglot);
  }

  getChildContext() {
    return {
      locale: this.polyglot,
      localeData: this.props.locale,
    };
  }

  render() {
    return this.props.children;
  }
}

International.childContextTypes = {
  locale: PropTypes.object,
  localeData: PropTypes.object,
};

export default International;

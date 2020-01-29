import React, { PureComponent, useContext } from 'react';
import Polyglot from 'node-polyglot';
import LocaleContext from './context';
import { getDisplayName, getForwardedComponent } from '../utils';

const { Provider, Consumer } = LocaleContext;

export function useInternational() {
  return useContext(LocaleContext);
}

export const connectLocale = (Component, options = {}) => {
  const LocalizedComponent = ({ forwardedRef, ...props }) => {
    const locale = useInternational();
    return <Component {...props} {...locale} ref={forwardedRef} />;
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
    this.staticContext = this.getDefaultContext();
  }

  getDefaultContext() {
    const { t } = this.polyglot;
    const { locale } = this.props;

    return { t, locale };
  }

  render() {
    return <Provider value={this.staticContext}>{this.props.children}</Provider>;
  }
}

export default International;
export { LocaleContext, Consumer };

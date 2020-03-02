import React, { useState, useContext } from 'react';
import LocaleContext from './context';
import { getDisplayName, getForwardedComponent } from '../utils';
import createTranslatorInstance from './setup';

const { Provider, Consumer } = LocaleContext;

export const useInternational = () => useContext(LocaleContext);

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

const International = ({ locale, children }) => {
  const [context] = useState(() => {
    const { t } = createTranslatorInstance(locale);
    return { t, locale };
  });

  return <Provider value={context}>{children}</Provider>;
};

export default International;
export { LocaleContext, Consumer };

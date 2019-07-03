import { getDisplayName, getForwardedComponent } from '../utils';

const proxyRef = (Component) => (
  getForwardedComponent(getDisplayName('proxyRef', Component), Component)
);

export default proxyRef;

import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window: win } = jsdom;

const copyProps = (src, target) => {
  const check = (prop) => typeof target[prop] === 'undefined';
  const collect = (acc, prop) => ({
    ...acc,
    [prop]: Object.getOwnPropertyDescriptor(src, prop),
  });

  const props = Object.getOwnPropertyNames(src).filter(check).reduce(collect, {});
  Object.defineProperties(target, props);
};

global.window = win;
global.document = win.document;
global.navigator = {
  userAgent: 'node.js',
};
global.IS_REACT_ACT_ENVIRONMENT = true;

copyProps(win, global);

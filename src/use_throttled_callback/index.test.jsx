import { assert } from 'chai';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useEffect } from 'react';
import sinon from 'sinon';
import useThrottledCallback from './index';

const TestComponent = ({ handler, delay, deps, onCallbackChange }) => {
  const callback = useThrottledCallback(handler, delay, deps);

  useEffect(() => {
    onCallbackChange(callback);
  }, [callback]);

  return null;
};

const getWrappedUseThrottledCallback = (delay, deps) => {
  const hookCallbackRef = { current: null };

  const onCallbackChange = (newCallback) => { hookCallbackRef.current = newCallback; };
  const handler = sinon.spy();

  const wrapper = mount(<TestComponent {...{ handler, delay, deps, onCallbackChange }} />);

  return { wrapper, hookCallbackRef, handler };
};

describe('use_throttled_callback', () => {
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  context('deps change', () => {
    it('cancels queue', () => {
      const { wrapper, hookCallbackRef, handler } = getWrappedUseThrottledCallback(200, [1]);

      act(() => { hookCallbackRef.current(); });
      wrapper.setProps({ deps: [2] });
      act(() => { clock.tick(20); });
      act(() => { hookCallbackRef.current(); });

      assert.isTrue(handler.calledTwice);
    });
  });

  context('handler changes', () => {
    it('queue stays', () => {
      const { wrapper, hookCallbackRef, handler } = getWrappedUseThrottledCallback(200, []);

      act(() => { hookCallbackRef.current(); });

      const newHandler = sinon.spy();
      wrapper.setProps({ handler: newHandler });

      act(() => { clock.tick(190); });
      act(() => { hookCallbackRef.current(); });

      assert.isTrue(handler.called, 'old handler got called');
      assert.isFalse(newHandler.called, 'new handler did not get called');
    });

    it('returns same callback', () => {
      const { wrapper, hookCallbackRef } = getWrappedUseThrottledCallback(200, []);
      const initialHookCallback = hookCallbackRef.current;

      wrapper.setProps({ handler: sinon.spy() });

      assert.equal(initialHookCallback, hookCallbackRef.current);
    });
  });

  it('calls handler throttled', () => {
    const { hookCallbackRef, handler } = getWrappedUseThrottledCallback(100, []);
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(50); });
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(60); });
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(50); });
    act(() => { hookCallbackRef.current(); });

    assert.isTrue(handler.calledTwice);
  });
});

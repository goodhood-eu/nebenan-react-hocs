import { assert } from 'chai';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useEffect } from 'react';
import sinon from 'sinon';
import useDebouncedCallback from './index';

const TestComponent = ({ handler, delay, deps, onCallbackChange }) => {
  const callback = useDebouncedCallback(handler, delay, deps);

  useEffect(() => {
    onCallbackChange(callback);
  }, [callback]);

  return null;
};

const getWrappedUseDebouncedCallback = (delay, deps) => {
  const hookCallbackRef = { current: null };

  const onCallbackChange = (newCallback) => { hookCallbackRef.current = newCallback; };
  const handler = sinon.spy();

  const wrapper = mount(<TestComponent {...{ handler, delay, deps, onCallbackChange }} />);

  return { wrapper, hookCallbackRef, handler };
};

describe('use_debounced_callback', () => {
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  context('deps change', () => {
    it('cancels queue', () => {
      const { wrapper, hookCallbackRef, handler } = getWrappedUseDebouncedCallback(200, [1]);
      act(() => { hookCallbackRef.current(); });
      wrapper.setProps({ deps: [2] });

      act(() => { clock.tick(200); });

      assert.isNotTrue(handler.called);
    });
  });

  context('handler changes', () => {
    it('queue stays', () => {
      const { wrapper, hookCallbackRef, handler } = getWrappedUseDebouncedCallback(200, []);
      act(() => { hookCallbackRef.current(); });

      const newHandler = sinon.spy();
      wrapper.setProps({ handler: newHandler });

      act(() => { clock.tick(200); });

      assert.isTrue(newHandler.called, 'new handler got called');
      assert.isFalse(handler.called, 'old handler did not get called');
    });

    it('returns same callback', () => {
      const { wrapper, hookCallbackRef } = getWrappedUseDebouncedCallback(200, []);
      const initialHookCallback = hookCallbackRef.current;

      wrapper.setProps({ handler: sinon.spy() });

      assert.equal(initialHookCallback, hookCallbackRef.current);
    });
  });

  context('delay changes', () => {
    it('cancels queue', () => {
      const { wrapper, hookCallbackRef, handler } = getWrappedUseDebouncedCallback(200, []);
      act(() => { hookCallbackRef.current(); });

      wrapper.setProps({ delay: 1 });

      act(() => { clock.tick(200); });

      assert.isNotTrue(handler.called);
    });

    it('returns new callback', () => {
      const { wrapper, hookCallbackRef } = getWrappedUseDebouncedCallback(200, []);
      const initialHookCallback = hookCallbackRef.current;

      wrapper.setProps({ delay: 1 });

      assert.notEqual(initialHookCallback, hookCallbackRef.current);
    });
  });

  it('calls handler debounced', () => {
    const { hookCallbackRef, handler } = getWrappedUseDebouncedCallback(100, []);
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(70); });
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(100); });
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(100); });

    assert.isTrue(handler.calledTwice);
  });
});

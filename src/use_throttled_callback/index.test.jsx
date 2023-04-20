import { it } from 'mocha';
import { expect } from 'chai';
import { render, act } from '@testing-library/react';
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
      const hookCallbackRef = { current: null };

      const onCallbackChange = (newCallback) => {
        hookCallbackRef.current = newCallback;
      };
      const handler = sinon.spy();

      const { rerender } = render(
        <TestComponent
          handler={handler}
          delay={200}
          deps={[1]}
          onCallbackChange={onCallbackChange}
        />);

      act(() => { hookCallbackRef.current(); });
      rerender(
        <TestComponent
          handler={handler}
          delay={200}
          deps={[2]}
          onCallbackChange={onCallbackChange}
        />);
      act(() => { clock.tick(20); });
      act(() => { hookCallbackRef.current(); });

      expect(handler.calledTwice).is.true;
    });
  });

  context('handler changes', () => {
    it('queue stays', () => {
      const hookCallbackRef = { current: null };

      const onCallbackChange = (newCallback) => {
        hookCallbackRef.current = newCallback;
      };
      const handler = sinon.spy();

      const { rerender } = render(
        <TestComponent
          handler={handler}
          delay={200}
          deps={[]}
          onCallbackChange={onCallbackChange}
        />);

      act(() => { hookCallbackRef.current(); });

      const newHandler = sinon.spy();
      rerender(<TestComponent
        handler={newHandler}
        delay={200}
        deps={[]}
        onCallbackChange={onCallbackChange}
      />);

      act(() => { clock.tick(190); });
      act(() => { hookCallbackRef.current(); });

      expect(handler.called, 'old handler got called').is.true;
      expect(newHandler.called, 'new handler did not get called').is.false;
    });

    it('returns same callback', () => {
      const hookCallbackRef = { current: null };

      const onCallbackChange = (newCallback) => {
        hookCallbackRef.current = newCallback;
      };
      const handler = sinon.spy();

      const { rerender } = render(
        <TestComponent
          handler={handler}
          delay={200}
          deps={[]}
          onCallbackChange={onCallbackChange}
        />);
      const initialHookCallback = hookCallbackRef.current;

      const newHandler = sinon.spy();
      rerender(<TestComponent
        handler={newHandler}
        delay={200}
        deps={[]}
        onCallbackChange={onCallbackChange}
      />);

      expect(initialHookCallback).is.equal(hookCallbackRef.current);
    });
  });

  it('calls handler throttled', () => {
    const hookCallbackRef = { current: null };

    const onCallbackChange = (newCallback) => {
      hookCallbackRef.current = newCallback;
    };
    const handler = sinon.spy();

    render(
      <TestComponent
        handler={handler}
        delay={100}
        deps={[]}
        onCallbackChange={onCallbackChange}
      />);
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(50); });
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(60); });
    act(() => { hookCallbackRef.current(); });
    act(() => { clock.tick(50); });
    act(() => { hookCallbackRef.current(); });

    expect(handler.calledTwice).is.true;
  });
});

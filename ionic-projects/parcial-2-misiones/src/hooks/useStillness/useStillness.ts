import { useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '@capacitor/motion';
import type { PluginListenerHandle } from '@capacitor/core';
import { GRAVITY, STILL_TICK_MS, STILL_TOLERANCE } from '../../constants/config';

type Options = {
  seconds: number;
  onComplete: () => void;
};

type Vector = { x?: number | null; y?: number | null; z?: number | null } | undefined;

const hasValues = (vector: Vector): vector is NonNullable<Vector> =>
  Boolean(vector) &&
  [vector?.x, vector?.y, vector?.z].some((value) => typeof value === 'number');

const magnitudeOf = (vector: NonNullable<Vector>) =>
  Math.hypot(vector.x ?? 0, vector.y ?? 0, vector.z ?? 0);

export const useStillness = ({ seconds, onComplete }: Options) => {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(seconds);
  const [moving, setMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listener = useRef<PluginListenerHandle | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMovement = useRef(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clear = useCallback(async () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (listener.current) {
      const handle = listener.current;
      listener.current = null;
      await handle.remove();
    }
  }, []);

  const stop = useCallback(async () => {
    await clear();
    setActive(false);
    setMoving(false);
    setRemaining(seconds);
  }, [clear, seconds]);

  const start = useCallback(async () => {
    if (listener.current) return;
    try {
      setError(null);
      lastMovement.current = Date.now();
      setRemaining(seconds);
      setMoving(false);
      setActive(true);

      listener.current = await Motion.addListener('accel', (event) => {
        const linear = event.acceleration as Vector;
        const withGravity = event.accelerationIncludingGravity as Vector;

        let deviation = 0;
        if (hasValues(linear)) {
          deviation = magnitudeOf(linear);
        } else if (hasValues(withGravity)) {
          deviation = Math.abs(magnitudeOf(withGravity) - GRAVITY);
        }

        if (deviation > STILL_TOLERANCE) {
          lastMovement.current = Date.now();
        }
      });

      timer.current = setInterval(() => {
        const elapsed = (Date.now() - lastMovement.current) / 1000;
        setMoving(Date.now() - lastMovement.current < 600 && elapsed < seconds);
        setRemaining(Math.max(0, seconds - elapsed));

        if (elapsed >= seconds) {
          clear().then(() => {
            setActive(false);
            setMoving(false);
            setRemaining(seconds);
            onCompleteRef.current();
          });
        }
      }, STILL_TICK_MS);
    } catch (err) {
      setError((err as Error).message);
      await clear();
      setActive(false);
    }
  }, [clear, seconds]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return { active, remaining, moving, error, start, stop };
};

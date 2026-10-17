import { useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '@capacitor/motion';
import type { PluginListenerHandle } from '@capacitor/core';

type Options = {
  threshold?: number;
  interval?: number;
  shakeDelay?: number;
};

export const useAccelerometer = ({ threshold = 20, interval = 100, shakeDelay = 1000 }: Options = {}) => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [magnitude, setMagnitude] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastUpdate = useRef(0);
  const lastShake = useRef(0);
  const listenerRef = useRef<PluginListenerHandle | null>(null);

  const stop = useCallback(async () => {
    if (listenerRef.current) {
      await listenerRef.current.remove();
      listenerRef.current = null;
    }
    setActive(false);
  }, []);

  const start = useCallback(async () => {
    if (listenerRef.current) return;
    try {
      setError(null);
      listenerRef.current = await Motion.addListener('accel', (event) => {
        const now = Date.now();
        if (now - lastUpdate.current < interval) return;
        lastUpdate.current = now;

        const acc = event.acceleration ?? event.accelerationIncludingGravity;
        const x = acc?.x || 0;
        const y = acc?.y || 0;
        const z = acc?.z || 0;

        setAcceleration({ x, y, z });

        const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
        setMagnitude(total);
        setIsMoving(total > 2);

        if (total > threshold && now - lastShake.current > shakeDelay) {
          setIsShaking(true);
          lastShake.current = now;
          setTimeout(() => setIsShaking(false), 500);
        }
      });
      setActive(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [interval, threshold, shakeDelay]);

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, [start, stop]);

  return { acceleration, magnitude, isShaking, isMoving, active, error, start, stop };
};

export default useAccelerometer;

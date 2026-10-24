import { useCallback, useEffect, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { distanceInMeters, type Coordinates } from '../../helpers/distance/distance';
import { GPS_INTERVAL_MS, MAX_GPS_ACCURACY_METERS } from '../../constants/config';

type Options = {
  threshold: number;
  onReached: () => void;
};

export const useDistanceTracker = ({ threshold, onReached }: Options) => {
  const [tracking, setTracking] = useState(false);
  const [hasOrigin, setHasOrigin] = useState(false);
  const [distance, setDistance] = useState(0);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const watchId = useRef<string | null>(null);
  const origin = useRef<Coordinates | null>(null);
  const onReachedRef = useRef(onReached);

  useEffect(() => {
    onReachedRef.current = onReached;
  }, [onReached]);

  const clear = useCallback(async () => {
    if (watchId.current) {
      const id = watchId.current;
      watchId.current = null;
      await Geolocation.clearWatch({ id });
    }
  }, []);

  const stop = useCallback(async () => {
    await clear();
    origin.current = null;
    setHasOrigin(false);
    setTracking(false);
    setDistance(0);
    setAccuracy(null);
  }, [clear]);

  const start = useCallback(async () => {
    if (watchId.current) return;
    try {
      setError(null);
      const status = await Geolocation.checkPermissions();
      if (status.location !== 'granted') {
        const requested = await Geolocation.requestPermissions();
        if (requested.location !== 'granted') {
          setError('Necesitas dar permiso de ubicación.');
          return;
        }
      }

      origin.current = null;
      setHasOrigin(false);
      setDistance(0);
      setTracking(true);

      watchId.current = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          interval: GPS_INTERVAL_MS,
          minimumUpdateInterval: GPS_INTERVAL_MS,
        },
        (position, err) => {
          if (err || !position) {
            if (err) setError(err.message);
            return;
          }

          const { latitude, longitude, accuracy: fixAccuracy } = position.coords;
          setAccuracy(fixAccuracy);

          if (fixAccuracy > MAX_GPS_ACCURACY_METERS) return;

          if (!origin.current) {
            origin.current = { latitude, longitude };
            setHasOrigin(true);
            return;
          }

          const meters = distanceInMeters(origin.current, { latitude, longitude });
          setDistance(meters);

          if (meters > threshold) {
            clear().then(() => {
              setTracking(false);
              onReachedRef.current();
            });
          }
        },
      );
    } catch (err) {
      setError((err as Error).message);
      setTracking(false);
    }
  }, [clear, threshold]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return { tracking, hasOrigin, distance, accuracy, error, start, stop };
};

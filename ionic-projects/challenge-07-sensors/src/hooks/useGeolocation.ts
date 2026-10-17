import { useEffect, useRef, useState } from 'react';
import { Geolocation, type Position } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [position, setPosition] = useState<Position['coords'] | null>(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<string | null>(null);

  const ensurePermission = async () => {
    try {
      const status = await Geolocation.checkPermissions();
      if (status.location !== 'granted') {
        await Geolocation.requestPermissions();
      }
    } catch {
      return;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setError(null);
      await ensurePermission();
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      setPosition(pos.coords);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const startTracking = async () => {
    if (watchId.current) return;
    try {
      setError(null);
      await ensurePermission();
      const id = await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
        if (err) {
          setError(err.message);
          return;
        }
        if (pos) setPosition(pos.coords);
      });
      watchId.current = id;
      setTracking(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const stopTracking = async () => {
    if (watchId.current) {
      await Geolocation.clearWatch({ id: watchId.current });
      watchId.current = null;
      setTracking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (watchId.current) {
        Geolocation.clearWatch({ id: watchId.current });
        watchId.current = null;
      }
    };
  }, []);

  return { position, tracking, error, getCurrentLocation, startTracking, stopTracking };
};

export default useGeolocation;

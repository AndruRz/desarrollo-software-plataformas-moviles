import { useCallback } from 'react';
import { Haptics } from '@capacitor/haptics';
import { VIBRATION_MS } from '../../constants/config';

export const useVibration = () => {
  const vibrate = useCallback(async (duration = VIBRATION_MS) => {
    try {
      await Haptics.vibrate({ duration });
    } catch {
      return;
    }
  }, []);

  return { vibrate };
};

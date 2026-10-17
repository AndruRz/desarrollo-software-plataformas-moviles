import { useState } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

type ImpactName = 'light' | 'medium' | 'heavy';
type NotifyName = 'success' | 'warning' | 'error';

const impactMap: Record<ImpactName, ImpactStyle> = {
  light: ImpactStyle.Light,
  medium: ImpactStyle.Medium,
  heavy: ImpactStyle.Heavy,
};

const notifyMap: Record<NotifyName, NotificationType> = {
  success: NotificationType.Success,
  warning: NotificationType.Warning,
  error: NotificationType.Error,
};

export const useHaptics = () => {
  const [error, setError] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    try {
      setError(null);
      await action();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const impact = (style: ImpactName = 'medium') => run(() => Haptics.impact({ style: impactMap[style] }));
  const notify = (type: NotifyName = 'success') => run(() => Haptics.notification({ type: notifyMap[type] }));
  const vibrate = (duration = 100) => run(() => Haptics.vibrate({ duration }));
  const selectionStart = () => run(() => Haptics.selectionStart());
  const selectionChanged = () => run(() => Haptics.selectionChanged());
  const selectionEnd = () => run(() => Haptics.selectionEnd());

  return { error, impact, notify, vibrate, selectionStart, selectionChanged, selectionEnd };
};

export default useHaptics;

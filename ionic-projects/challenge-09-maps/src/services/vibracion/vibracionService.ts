import { Haptics } from '@capacitor/haptics';

export const vibrar = async (duracionMs = 400): Promise<void> => {
  try {
    await Haptics.vibrate({ duration: duracionMs });
  } catch {
    // Sin vibrador (navegador o emulador): se ignora.
  }
};

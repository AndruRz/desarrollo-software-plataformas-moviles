import type { Session } from '@supabase/supabase-js';
import { useState } from 'react';

import { subirAvatar } from '../../services/avatars/avatarService';
import { tomarFoto } from '../../services/camera/cameraService';

interface EstadoAvatar {
  url: string | null;
  subiendo: boolean;
  error: string | null;
  limpiarError: () => void;
  capturar: () => Promise<void>;
}

export const useAvatar = (session: Session): EstadoAvatar => {
  const [url, setUrl] = useState<string | null>((session.user.user_metadata?.avatar_url as string | undefined) ?? null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capturar = async () => {
    try {
      setError(null);
      const foto = await tomarFoto();
      setSubiendo(true);
      setUrl(await subirAvatar(session.user.id, foto));
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : 'Error inesperado';
      if (!/cancel/i.test(mensaje)) setError(mensaje);
    } finally {
      setSubiendo(false);
    }
  };

  return { url, subiendo, error, limpiarError: () => setError(null), capturar };
};

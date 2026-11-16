import type { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { escucharSesion, obtenerSesion } from '../../services/auth/authService';

interface EstadoSesion {
  session: Session | null;
  cargando: boolean;
}

export const useSession = (): EstadoSesion => {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerSesion().then((actual) => {
      setSession(actual);
      setCargando(false);
    });
    return escucharSesion(setSession);
  }, []);

  return { session, cargando };
};

import type { Session } from '@supabase/supabase-js';

import { supabase } from '../../lib/supabase';

export const registrar = async (email: string, password: string, nombre: string): Promise<void> => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
      data: { nombre },
    },
  });
  if (error) throw error;
};

export const iniciarSesion = async (email: string, password: string): Promise<void> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const cerrarSesion = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const obtenerSesion = async (): Promise<Session | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const escucharSesion = (callback: (session: Session | null) => void): (() => void) => {
  const { data } = supabase.auth.onAuthStateChange((_evento, session) => callback(session));
  return () => data.subscription.unsubscribe();
};

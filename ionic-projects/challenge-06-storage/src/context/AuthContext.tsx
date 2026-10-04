import { createContext, useContext, type ReactNode } from 'react';
import type { User, UserCredential } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, cargando, login, register, logout } = useAuth();

  // Mientras Firebase recupera la sesión guardada no pintamos nada
  if (cargando) return null;

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
  return ctx;
}

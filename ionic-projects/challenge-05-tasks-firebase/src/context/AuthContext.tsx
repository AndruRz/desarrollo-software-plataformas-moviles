// @ts-nocheck
import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { user, cargando, login, register, logout } = useAuth();

  if (cargando) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
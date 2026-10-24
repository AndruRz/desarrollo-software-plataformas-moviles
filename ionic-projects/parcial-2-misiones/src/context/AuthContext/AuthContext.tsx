import { createContext, useContext, type ReactNode } from 'react';
import type { User, UserCredential } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { getDisplayName } from '../../helpers/userName/userName';

type AuthContextType = {
  user: User | null;
  displayName: string;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, name: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading, login, register, logout } = useAuth();

  const displayName = getDisplayName(user);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, displayName, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
  return context;
};

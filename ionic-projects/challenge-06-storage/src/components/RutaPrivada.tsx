import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const RutaPrivada = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default RutaPrivada;

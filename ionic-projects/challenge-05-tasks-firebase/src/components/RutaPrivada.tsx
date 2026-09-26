// @ts-nocheck
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const RutaPrivada = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RutaPrivada;
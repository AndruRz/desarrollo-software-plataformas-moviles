// @ts-nocheck
import { Navigate } from 'react-router-dom';
import { isLogged } from '../auth';

const RutaPrivada = ({ children }) => {
  if (!isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RutaPrivada;

// @ts-nocheck
import { Navigate } from 'react-router-dom';
import { isLogged } from '../auth';

// Envuelve una página: si no hay token en localStorage, redirige a /login
// en vez de renderizar la página. Se usa en App.tsx alrededor de cada
// ruta que debe quedar detrás del login (/list, /detalle/:id, /crear).
const RutaPrivada = ({ children }) => {
  if (!isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RutaPrivada;

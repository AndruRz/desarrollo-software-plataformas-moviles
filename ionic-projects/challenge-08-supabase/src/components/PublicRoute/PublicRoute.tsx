import { IonSpinner } from '@ionic/react';
import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useSession } from '../../hooks/useSession/useSession';

interface PublicRouteProps {
  children: ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { session, cargando } = useSession();

  if (cargando) return <IonSpinner />;
  if (session) return <Navigate to="/tareas" replace />;
  return children;
};

export default PublicRoute;

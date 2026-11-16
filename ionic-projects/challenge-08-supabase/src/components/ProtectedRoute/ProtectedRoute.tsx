import { IonSpinner } from '@ionic/react';
import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useSession } from '../../hooks/useSession/useSession';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, cargando } = useSession();

  if (cargando) return <IonSpinner />;
  if (!session) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;

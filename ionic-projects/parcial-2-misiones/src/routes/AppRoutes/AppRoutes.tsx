import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import MainTabs from '../MainTabs/MainTabs';
import RutaPrivada from '../RutaPrivada/RutaPrivada';

const AppRoutes = () => (
  <IonRouterOutlet>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/tabs/*"
      element={
        <RutaPrivada>
          <MainTabs />
        </RutaPrivada>
      }
    />
    <Route path="/" element={<Navigate to="/tabs/misiones" replace />} />
  </IonRouterOutlet>
);

export default AppRoutes;

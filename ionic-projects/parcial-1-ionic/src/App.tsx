import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, peopleOutline, personOutline } from 'ionicons/icons';

import Login from './pages/Login';
import Visitas from './pages/Visitas';
import VisitaDetalle from './pages/VisitaDetalle';
import Pacientes from './pages/Pacientes';
import Perfil from './pages/Perfil';
import { obtenerSesion } from './utils/storage';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const MainTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="visitas" element={<Visitas />} />
      <Route path="visitas/:id" element={<VisitaDetalle />} />
      <Route path="pacientes" element={<Pacientes />} />
      <Route path="perfil" element={<Perfil />} />
      <Route index element={<Navigate to="visitas" replace />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="visitas" href="/tabs/visitas">
        <IonIcon icon={calendarOutline} />
        <IonLabel>Visitas</IonLabel>
      </IonTabButton>
      <IonTabButton tab="pacientes" href="/tabs/pacientes">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Pacientes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="perfil" href="/tabs/perfil">
        <IonIcon icon={personOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

const App: React.FC = () => {
  const sesionActiva = obtenerSesion();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" element={<Login />} />
          <Route path="/tabs/*" element={<MainTabs />} />
          <Route path="/" element={<Navigate to={sesionActiva ? '/tabs/visitas' : '/login'} replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

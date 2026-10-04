import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { peopleOutline, checkboxOutline, nutritionOutline } from 'ionicons/icons';

import Login from './pages/Login';
import Register from './pages/Register';
import Contactos from './pages/Contactos';
import ContactoForm from './pages/ContactoForm';
import Tareas from './pages/Tareas';
import Frutas from './pages/Frutas';
import RutaPrivada from './components/RutaPrivada';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const MainTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="contactos" element={<Contactos />} />
      <Route path="contactos/nuevo" element={<ContactoForm />} />
      <Route path="contactos/:id" element={<ContactoForm />} />
      <Route path="tareas" element={<Tareas />} />
      <Route path="frutas" element={<Frutas />} />
      <Route index element={<Navigate to="contactos" replace />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="contactos" href="/tabs/contactos">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Contactos</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tareas" href="/tabs/tareas">
        <IonIcon icon={checkboxOutline} />
        <IonLabel>Tareas</IonLabel>
      </IonTabButton>
      <IonTabButton tab="frutas" href="/tabs/frutas">
        <IonIcon icon={nutritionOutline} />
        <IonLabel>Frutas</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
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
        <Route path="/" element={<Navigate to="/tabs/contactos" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

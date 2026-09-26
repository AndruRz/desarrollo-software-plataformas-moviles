import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksList from './pages/TasksList';
import AddEditTask from './pages/AddEditTask';
import TaskDetail from './pages/TaskDetail';
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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/tareas"
          element={
            <RutaPrivada>
              <TasksList />
            </RutaPrivada>
          }
        />
        <Route
          path="/tareas/nueva"
          element={
            <RutaPrivada>
              <AddEditTask />
            </RutaPrivada>
          }
        />
        <Route
          path="/tareas/:id/editar"
          element={
            <RutaPrivada>
              <AddEditTask />
            </RutaPrivada>
          }
        />
        <Route
          path="/tareas/:id"
          element={
            <RutaPrivada>
              <TaskDetail />
            </RutaPrivada>
          }
        />

        <Route path="/" element={<Navigate to="/tareas" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
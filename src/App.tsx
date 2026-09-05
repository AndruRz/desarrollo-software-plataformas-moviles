import { useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import List from './pages/List';
import Detail from './pages/Detail';
import Create from './pages/Create';
import RutaPrivada from './components/RutaPrivada';
import { isLogged } from './auth';

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

const App: React.FC = () => {
  // Igual que en Practice 02: el array vive en App porque List, Detail
  // y Create son rutas distintas y todas necesitan leer/modificar lo mismo.
  const [contactos, setContactos] = useState([
    { id: 1, nombre: 'André Rodriguez', telefono: '300 123 4567' },
    { id: 2, nombre: 'Pablo Pérez', telefono: '311 987 6543' },
    { id: 3, nombre: 'Lina Ospina', telefono: '320 456 7890' },
  ]);

  const agregarContacto = (nuevoContacto: { id: number; nombre: string; telefono: string }) => {
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  const eliminarContacto = (id: number) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" element={<Login />} />

          <Route
            path="/list"
            element={
              <RutaPrivada>
                <List contactos={contactos} onDelete={eliminarContacto} />
              </RutaPrivada>
            }
          />

          <Route
            path="/detalle/:id"
            element={
              <RutaPrivada>
                <Detail contactos={contactos} onDelete={eliminarContacto} />
              </RutaPrivada>
            }
          />

          <Route
            path="/crear"
            element={
              <RutaPrivada>
                <Create onAddContact={agregarContacto} />
              </RutaPrivada>
            }
          />

          <Route
            path="/"
            element={<Navigate to={isLogged() ? '/list' : '/login'} replace />}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

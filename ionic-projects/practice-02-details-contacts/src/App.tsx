import { useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Create from './pages/Create';
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
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

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
          <Route
            path="/home"
            element={<Home contactos={contactos} onDelete={eliminarContacto} />}
          />
          <Route
            path="/detalle/:id"
            element={<Detail contactos={contactos} onDelete={eliminarContacto} />}
          />
          <Route
            path="/crear"
            element={<Create onAddContact={agregarContacto} />}
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

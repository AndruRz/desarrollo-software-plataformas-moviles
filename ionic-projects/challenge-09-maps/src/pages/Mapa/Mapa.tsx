import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { compass, time } from 'ionicons/icons';
import { useState } from 'react';

import DireccionCard from '../../components/DireccionCard/DireccionCard';
import EstadoConexion from '../../components/EstadoConexion/EstadoConexion';
import FotoCard from '../../components/FotoCard/FotoCard';
import MapaView from '../../components/MapaView/MapaView';
import PanelRecorrido from '../../components/PanelRecorrido/PanelRecorrido';
import { useDireccion } from '../../hooks/useDireccion/useDireccion';
import { useFotoMarcada } from '../../hooks/useFotoMarcada/useFotoMarcada';
import { useRed } from '../../hooks/useRed/useRed';
import { useTracking } from '../../hooks/useTracking/useTracking';

const Mapa: React.FC = () => {
  const red = useRed();
  const [automatico, setAutomatico] = useState(false);
  const tracking = useTracking({ conectado: red.conectado, automatico });
  const { posicion } = tracking;
  const { direccion, error: errorDireccion } = useDireccion(posicion?.lat, posicion?.lng, red.conectado);
  const foto = useFotoMarcada(posicion, direccion);

  const mensaje = tracking.aviso ?? foto.error ?? '';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/lugares" aria-label="Lugares cercanos">
              <IonIcon slot="icon-only" icon={compass} />
            </IonButton>
            <IonButton routerLink="/historial" aria-label="Historial">
              <IonIcon slot="icon-only" icon={time} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding-horizontal">
          <EstadoConexion red={red} />
        </div>
        <MapaView centro={posicion} ruta={tracking.puntos} seguir />
        <DireccionCard direccion={direccion} error={errorDireccion} conectado={red.conectado} />
        <PanelRecorrido
          grabando={tracking.grabando}
          distanciaM={tracking.distanciaM}
          duracionMs={tracking.duracionMs}
          velocidad={posicion?.velocidad ?? null}
          automatico={automatico}
          procesandoFoto={foto.procesando}
          alIniciar={tracking.iniciar}
          alDetener={tracking.detener}
          alCambiarAutomatico={setAutomatico}
          alTomarFoto={foto.capturar}
        />
        <FotoCard foto={foto.foto} />
        <IonToast
          isOpen={mensaje !== ''}
          message={mensaje}
          duration={3500}
          position="top"
          onDidDismiss={() => {
            tracking.limpiarAviso();
            foto.limpiarError();
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Mapa;

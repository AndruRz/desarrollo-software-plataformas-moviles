import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useMemo, useState } from 'react';

import EstadoConexion from '../../components/EstadoConexion/EstadoConexion';
import MapaView from '../../components/MapaView/MapaView';
import { useLugares } from '../../hooks/useLugares/useLugares';
import { useRed } from '../../hooks/useRed/useRed';
import { formatearDistancia } from '../../utils/geo';

const TIPOS = ['restaurante', 'farmacia', 'café', 'banco', 'supermercado', 'hospital'];

const Lugares: React.FC = () => {
  const red = useRed();
  const { lugares, centro, cargando, error, buscar } = useLugares();
  const [tipo, setTipo] = useState(TIPOS[0]);

  useIonViewWillEnter(() => {
    void buscar(tipo, red.conectado);
  });

  const marcadores = useMemo(() => lugares.map((l) => ({ lat: l.lat, lng: l.lng, titulo: l.nombre })), [lugares]);

  const cambiarTipo = (nuevo: string) => {
    setTipo(nuevo);
    void buscar(nuevo, red.conectado);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/mapa" />
          </IonButtons>
          <IonTitle>Lugares cercanos</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment scrollable value={tipo} onIonChange={(e) => cambiarTipo(String(e.detail.value))}>
            {TIPOS.map((t) => (
              <IonSegmentButton key={t} value={t}>
                <IonLabel>{t}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding-horizontal">
          <EstadoConexion red={red} />
        </div>
        <MapaView centro={centro} marcadores={marcadores} seguir={false} altura={220} />
        {cargando && (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        )}
        {error && (
          <div className="ion-text-center ion-padding">
            <IonNote color="danger">{error}</IonNote>
          </div>
        )}
        {!cargando && !error && lugares.length === 0 && (
          <div className="ion-text-center ion-padding">
            <IonNote>Sin resultados cerca</IonNote>
          </div>
        )}
        <IonList>
          {lugares.map((lugar) => (
            <IonItem key={`${lugar.lat},${lugar.lng},${lugar.nombre}`}>
              <IonLabel className="ion-text-wrap">
                <h2>{lugar.nombre}</h2>
                <p>{lugar.direccion}</p>
              </IonLabel>
              <IonNote slot="end">{formatearDistancia(lugar.distanciaM)}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lugares;

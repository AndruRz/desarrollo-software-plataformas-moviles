import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonToggle } from '@ionic/react';
import { camera, play, stop } from 'ionicons/icons';

import { formatearDistancia, formatearDuracion, msAKmh } from '../../utils/geo';

interface PanelRecorridoProps {
  grabando: boolean;
  distanciaM: number;
  duracionMs: number;
  velocidad: number | null;
  automatico: boolean;
  procesandoFoto: boolean;
  alIniciar: () => void;
  alDetener: () => void;
  alCambiarAutomatico: (valor: boolean) => void;
  alTomarFoto: () => void;
}

const Dato: React.FC<{ titulo: string; valor: string }> = ({ titulo, valor }) => (
  <IonCol className="ion-text-center">
    <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>{valor}</div>
    <small>{titulo}</small>
  </IonCol>
);

const PanelRecorrido: React.FC<PanelRecorridoProps> = ({
  grabando,
  distanciaM,
  duracionMs,
  velocidad,
  automatico,
  procesandoFoto,
  alIniciar,
  alDetener,
  alCambiarAutomatico,
  alTomarFoto,
}) => (
  <>
    <IonGrid>
      <IonRow>
        <Dato titulo="Distancia" valor={formatearDistancia(distanciaM)} />
        <Dato titulo="Tiempo" valor={formatearDuracion(duracionMs)} />
        <Dato titulo="Velocidad" valor={`${msAKmh(velocidad)} km/h`} />
      </IonRow>
    </IonGrid>
    <div className="ion-padding-horizontal">
      {grabando ? (
        <IonButton expand="block" color="danger" onClick={alDetener}>
          <IonIcon slot="start" icon={stop} />
          Detener recorrido
        </IonButton>
      ) : (
        <IonButton expand="block" onClick={alIniciar}>
          <IonIcon slot="start" icon={play} />
          Iniciar recorrido
        </IonButton>
      )}
      <IonButton expand="block" fill="outline" onClick={alTomarFoto} disabled={procesandoFoto}>
        <IonIcon slot="start" icon={camera} />
        Foto con ubicación
      </IonButton>
    </div>
    <IonItem lines="none">
      <IonToggle checked={automatico} onIonChange={(e) => alCambiarAutomatico(e.detail.checked)}>
        <IonLabel>
          Modo automático
          <p>Inicia al moverte y se detiene al quedarte quieto</p>
        </IonLabel>
      </IonToggle>
    </IonItem>
  </>
);

export default PanelRecorrido;

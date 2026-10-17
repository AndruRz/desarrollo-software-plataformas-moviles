import { IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import useGeolocation from '../hooks/useGeolocation';

const GeolocationPage = () => {
  const { position, tracking, error, getCurrentLocation, startTracking, stopTracking } = useGeolocation();

  return (
    <SensorPage title="Geolocalización" error={error}>
      <IonButton expand="block" onClick={getCurrentLocation}>
        Ubicación actual
      </IonButton>
      <IonButton expand="block" color="success" onClick={startTracking} disabled={tracking}>
        Iniciar seguimiento
      </IonButton>
      <IonButton expand="block" color="danger" onClick={stopTracking} disabled={!tracking}>
        Detener seguimiento
      </IonButton>

      <IonList className="ion-margin-top">
        <IonItem>
          <IonLabel>
            <p>Latitud</p>
            <h2>{position?.latitude ?? '—'}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Longitud</p>
            <h2>{position?.longitude ?? '—'}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Precisión (m)</p>
            <h2>{position?.accuracy?.toFixed(1) ?? '—'}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Altitud (m)</p>
            <h2>{position?.altitude?.toFixed(1) ?? '—'}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Velocidad (m/s)</p>
            <h2>{position?.speed?.toFixed(1) ?? '—'}</h2>
          </IonLabel>
        </IonItem>
      </IonList>
    </SensorPage>
  );
};

export default GeolocationPage;

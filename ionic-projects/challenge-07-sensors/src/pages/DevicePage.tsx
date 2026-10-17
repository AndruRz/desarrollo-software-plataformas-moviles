import { IonButton, IonList, IonItem, IonLabel, IonSpinner, IonProgressBar } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import useDevice from '../hooks/useDevice';

const DevicePage = () => {
  const { battery, info, deviceId, loading, error, refresh } = useDevice();

  if (loading) {
    return (
      <SensorPage title="Dispositivo" error={error}>
        <div className="ion-text-center ion-padding">
          <IonSpinner name="crescent" />
        </div>
      </SensorPage>
    );
  }

  const level = battery?.batteryLevel ?? 0;

  return (
    <SensorPage title="Dispositivo" error={error}>
      <IonList>
        <IonItem>
          <IonLabel>
            <p>Batería</p>
            <h2>{(level * 100).toFixed(0)}%</h2>
            <IonProgressBar value={level} />
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Estado de carga</p>
            <h2>{battery?.isCharging ? 'Cargando' : 'No cargando'}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Modelo</p>
            <h2>{info?.model}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Fabricante</p>
            <h2>{info?.manufacturer}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Plataforma</p>
            <h2>{info?.platform}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Sistema operativo</p>
            <h2>
              {info?.operatingSystem} {info?.osVersion}
            </h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <p>ID</p>
            <h2>{deviceId}</h2>
          </IonLabel>
        </IonItem>
      </IonList>

      <IonButton expand="block" className="ion-margin-top" onClick={refresh}>
        Actualizar
      </IonButton>
    </SensorPage>
  );
};

export default DevicePage;

import { IonButton, IonList, IonItem, IonLabel, IonBadge, IonText } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import useAccelerometer from '../hooks/useAccelerometer';

const AccelerometerPage = () => {
  const { acceleration, magnitude, isShaking, isMoving, active, error, start, stop } = useAccelerometer({ threshold: 18 });

  return (
    <SensorPage title="Acelerómetro" error={error}>
      <IonList>
        <IonItem>
          <IonLabel>X</IonLabel>
          <IonBadge slot="end">{acceleration.x.toFixed(2)}</IonBadge>
        </IonItem>
        <IonItem>
          <IonLabel>Y</IonLabel>
          <IonBadge slot="end">{acceleration.y.toFixed(2)}</IonBadge>
        </IonItem>
        <IonItem>
          <IonLabel>Z</IonLabel>
          <IonBadge slot="end">{acceleration.z.toFixed(2)}</IonBadge>
        </IonItem>
        <IonItem>
          <IonLabel>Magnitud</IonLabel>
          <IonBadge slot="end" color="tertiary">
            {magnitude.toFixed(2)}
          </IonBadge>
        </IonItem>
        <IonItem>
          <IonLabel>Movimiento</IonLabel>
          <IonBadge slot="end" color={isMoving ? 'success' : 'medium'}>
            {isMoving ? 'Sí' : 'No'}
          </IonBadge>
        </IonItem>
      </IonList>

      {isShaking && (
        <IonText color="danger">
          <h1 className="ion-text-center ion-margin-top">SHAKE DETECTADO</h1>
        </IonText>
      )}

      <IonButton expand="block" className="ion-margin-top" onClick={start} disabled={active}>
        Iniciar
      </IonButton>
      <IonButton expand="block" color="danger" onClick={stop} disabled={!active}>
        Detener
      </IonButton>
    </SensorPage>
  );
};

export default AccelerometerPage;

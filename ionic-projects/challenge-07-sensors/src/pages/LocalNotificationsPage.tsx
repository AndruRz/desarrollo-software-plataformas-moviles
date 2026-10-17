import { IonButton, IonItem, IonLabel, IonBadge, IonText } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import useLocalNotifications from '../hooks/useLocalNotifications';

const LocalNotificationsPage = () => {
  const { permission, lastId, lastTapped, error, requestPermission, sendNotification, scheduleNotification, cancelNotification } =
    useLocalNotifications();

  return (
    <SensorPage title="Notificaciones locales" error={error}>
      <IonItem>
        <IonLabel>Permiso</IonLabel>
        <IonBadge slot="end" color={permission === 'granted' ? 'success' : 'medium'}>
          {permission ?? 'desconocido'}
        </IonBadge>
      </IonItem>

      <IonButton expand="block" className="ion-margin-top" onClick={requestPermission}>
        Pedir permisos
      </IonButton>
      <IonButton
        expand="block"
        color="success"
        onClick={() => sendNotification({ title: 'Hola', body: 'Notificación inmediata' })}
      >
        Enviar ahora
      </IonButton>
      <IonButton
        expand="block"
        color="tertiary"
        onClick={() => scheduleNotification({ title: 'Recordatorio', body: 'En 5 segundos', seconds: 5 })}
      >
        Programar en 5 segundos
      </IonButton>
      <IonButton expand="block" color="danger" disabled={lastId === null} onClick={() => lastId !== null && cancelNotification(lastId)}>
        Cancelar la última
      </IonButton>

      {lastTapped && (
        <IonText color="medium">
          <p>Notificación tocada: {lastTapped}</p>
        </IonText>
      )}
    </SensorPage>
  );
};

export default LocalNotificationsPage;

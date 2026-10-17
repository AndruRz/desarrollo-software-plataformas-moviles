import { IonButton, IonItem, IonLabel, IonText } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import usePushNotifications from '../hooks/usePushNotifications';

const PushPage = () => {
  const { token, notification, error, requestPermission } = usePushNotifications();

  return (
    <SensorPage title="Notificaciones push" error={error}>
      <IonButton expand="block" onClick={requestPermission}>
        Activar push
      </IonButton>

      <IonItem className="ion-margin-top">
        <IonLabel className="ion-text-wrap">
          <p>Token</p>
          <h3 style={{ wordBreak: 'break-all' }}>{token ?? '—'}</h3>
        </IonLabel>
      </IonItem>

      {notification ? (
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <p>Última notificación</p>
            <h2>{notification.title}</h2>
            <p>{notification.body}</p>
          </IonLabel>
        </IonItem>
      ) : (
        <IonText color="medium">
          <p>Aún no se ha recibido ninguna notificación.</p>
        </IonText>
      )}
    </SensorPage>
  );
};

export default PushPage;

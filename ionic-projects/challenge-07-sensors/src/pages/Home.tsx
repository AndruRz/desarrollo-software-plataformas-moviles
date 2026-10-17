import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonText } from '@ionic/react';
import {
  locationOutline,
  cameraOutline,
  speedometerOutline,
  phonePortraitOutline,
  pulseOutline,
  folderOpenOutline,
  notificationsOutline,
  cloudUploadOutline,
} from 'ionicons/icons';

const sensors = [
  { path: '/geolocation', label: 'Geolocalización', icon: locationOutline },
  { path: '/camera', label: 'Cámara', icon: cameraOutline },
  { path: '/accelerometer', label: 'Acelerómetro', icon: speedometerOutline },
  { path: '/device', label: 'Dispositivo', icon: phonePortraitOutline },
  { path: '/haptics', label: 'Vibración (Haptics)', icon: pulseOutline },
  { path: '/filesystem', label: 'Archivos (Filesystem)', icon: folderOpenOutline },
  { path: '/notifications', label: 'Notificaciones locales', icon: notificationsOutline },
  { path: '/push', label: 'Notificaciones push', icon: cloudUploadOutline },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium">
          <p>Elige un sensor para probarlo.</p>
        </IonText>
        {sensors.map((sensor) => (
          <IonButton key={sensor.path} expand="block" className="ion-margin-bottom" onClick={() => navigate(sensor.path)}>
            <IonIcon slot="start" icon={sensor.icon} />
            {sensor.label}
          </IonButton>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;

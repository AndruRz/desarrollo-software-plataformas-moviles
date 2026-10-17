import { IonButton, IonIcon, IonImg, IonText } from '@ionic/react';
import { cameraOutline, imagesOutline } from 'ionicons/icons';
import SensorPage from '../components/SensorPage';
import useCamera from '../hooks/useCamera';

const CameraPage = () => {
  const { photo, error, takePhoto, pickFromGallery } = useCamera();

  return (
    <SensorPage title="Cámara" error={error}>
      <IonButton expand="block" onClick={takePhoto}>
        <IonIcon slot="start" icon={cameraOutline} />
        Tomar foto
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={pickFromGallery}>
        <IonIcon slot="start" icon={imagesOutline} />
        Elegir de la galería
      </IonButton>

      {photo ? (
        <IonImg src={photo} className="ion-margin-top" />
      ) : (
        <IonText color="medium">
          <p className="ion-text-center ion-margin-top">Aún no hay foto.</p>
        </IonText>
      )}
    </SensorPage>
  );
};

export default CameraPage;

import { IonButton } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import useHaptics from '../hooks/useHaptics';

const HapticsPage = () => {
  const { error, impact, notify, vibrate, selectionStart, selectionChanged, selectionEnd } = useHaptics();

  const handleSelection = async () => {
    await selectionStart();
    await selectionChanged();
    await selectionEnd();
  };

  return (
    <SensorPage title="Vibración" error={error}>
      <IonButton expand="block" onClick={() => impact('light')}>
        Impacto suave
      </IonButton>
      <IonButton expand="block" onClick={() => impact('medium')}>
        Impacto medio
      </IonButton>
      <IonButton expand="block" onClick={() => impact('heavy')}>
        Impacto fuerte
      </IonButton>
      <IonButton expand="block" color="success" onClick={() => notify('success')}>
        Éxito
      </IonButton>
      <IonButton expand="block" color="warning" onClick={() => notify('warning')}>
        Advertencia
      </IonButton>
      <IonButton expand="block" color="danger" onClick={() => notify('error')}>
        Error
      </IonButton>
      <IonButton expand="block" color="tertiary" onClick={handleSelection}>
        Selección
      </IonButton>
      <IonButton expand="block" color="dark" onClick={() => vibrate(200)}>
        Vibrar 200 ms
      </IonButton>
    </SensorPage>
  );
};

export default HapticsPage;

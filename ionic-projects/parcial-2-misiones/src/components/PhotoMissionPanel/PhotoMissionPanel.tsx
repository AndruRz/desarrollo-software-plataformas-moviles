import { IonButton, IonIcon, IonText } from '@ionic/react';
import { cameraOutline, saveOutline } from 'ionicons/icons';
import { useCamera } from '../../hooks/useCamera/useCamera';
import { useMissions } from '../../hooks/useMissions/useMissions';
import './PhotoMissionPanel.css';

type Props = {
  missionId: number;
};

const PhotoMissionPanel = ({ missionId }: Props) => {
  const { complete } = useMissions();
  const { previewSrc, saving, error, capture, save, discard } = useCamera();

  const handleSave = async () => {
    const saved = await save();
    if (saved) complete(missionId);
  };

  return (
    <>
      {previewSrc ? (
        <>
          <img className="photo-panel__preview" src={previewSrc} alt="Evidencia tomada" />
          <div className="photo-panel__actions">
            <IonButton fill="outline" onClick={discard} disabled={saving}>
              Repetir
            </IonButton>
            <IonButton onClick={handleSave} disabled={saving}>
              <IonIcon slot="start" icon={saveOutline} />
              Guardar imagen
            </IonButton>
          </div>
        </>
      ) : (
        <IonButton expand="block" onClick={capture}>
          <IonIcon slot="start" icon={cameraOutline} />
          Tomar foto
        </IonButton>
      )}

      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
    </>
  );
};

export default PhotoMissionPanel;

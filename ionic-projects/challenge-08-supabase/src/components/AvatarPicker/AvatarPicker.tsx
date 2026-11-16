import { IonAvatar, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { camera, person } from 'ionicons/icons';

interface AvatarPickerProps {
  url: string | null;
  subiendo: boolean;
  alCapturar: () => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ url, subiendo, alCapturar }) => (
  <div className="ion-text-center ion-padding">
    <IonAvatar style={{ width: 96, height: 96, margin: '0 auto' }}>
      {url ? (
        <img src={url} alt="Avatar" />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--ion-color-light)',
          }}
        >
          <IonIcon icon={person} size="large" />
        </div>
      )}
    </IonAvatar>
    <IonButton fill="outline" size="small" onClick={alCapturar} disabled={subiendo}>
      {subiendo ? <IonSpinner name="dots" /> : <IonIcon slot="start" icon={camera} />}
      {subiendo ? '' : 'Tomar foto'}
    </IonButton>
  </div>
);

export default AvatarPicker;

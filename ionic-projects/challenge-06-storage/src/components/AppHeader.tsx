import { useNavigate } from 'react-router-dom';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  IonChip,
  IonLabel,
} from '@ionic/react';
import { logOutOutline, wifiOutline, cellularOutline, cloudOfflineOutline } from 'ionicons/icons';
import { useAuthContext } from '../context/AuthContext';
import { useNetworkContext } from '../context/NetworkContext';

type Props = { title: string; back?: string };

const AppHeader = ({ title, back }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { isOnline, connectionType } = useNetworkContext();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const icon = !isOnline ? cloudOfflineOutline : connectionType === 'wifi' ? wifiOutline : cellularOutline;

  return (
    <IonHeader>
      <IonToolbar>
        {back && (
          <IonButtons slot="start">
            <IonBackButton defaultHref={back} />
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonChip color={isOnline ? 'success' : 'danger'}>
            <IonIcon icon={icon} />
            <IonLabel>{isOnline ? 'En línea' : 'Sin conexión'}</IonLabel>
          </IonChip>
          <IonButton onClick={handleLogout}>
            <IonIcon slot="icon-only" icon={logOutOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;

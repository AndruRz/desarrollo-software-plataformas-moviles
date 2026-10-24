import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/AuthContext';

type Props = {
  title: string;
};

const AppHeader = ({ title }: Props) => {
  const navigate = useNavigate();
  const { logout, displayName } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={handleLogout} aria-label={`Cerrar sesión de ${displayName}`}>
            <IonIcon slot="icon-only" icon={logOutOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonContent, IonPage, IonInput, IonButton, IonToast, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonText
} from '@ionic/react';
import { guardarSesion } from '../utils/storage';

const USUARIO = 'doctor';
const PASSWORD = '1234';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (usuario === USUARIO && password === PASSWORD) {
      guardarSesion(usuario);
      navigate('/tabs/visitas');
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediClinic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Usuario</IonLabel>
          <IonInput value={usuario} onIonInput={e => setUsuario(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput type="password" value={password} onIonInput={e => setPassword(e.detail.value ?? '')} />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Ingresar
        </IonButton>
        <IonText color="medium">
          <p className="ion-text-center">Credenciales de prueba: doctor / 1234</p>
        </IonText>
        <IonToast
          isOpen={showToast}
          message="Usuario o contraseña incorrectos"
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
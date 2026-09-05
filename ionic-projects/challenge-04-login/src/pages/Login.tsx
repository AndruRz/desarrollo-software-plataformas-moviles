// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import { login } from '../auth';

// Credenciales fijas que pide el challenge (no hay backend real).
const VALID_EMAIL = 'user@mail.com';
const VALID_PASSWORD = '123';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      login(); // guarda logged = "true" en localStorage
      navigate('/list', { replace: true });
    } else {
      setError('Email o contraseña incorrectos.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Email"
            labelPlacement="stacked"
            type="email"
            placeholder="user@mail.com"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="stacked"
            type="password"
            placeholder="••••"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value)}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p className="ion-padding-start">{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;

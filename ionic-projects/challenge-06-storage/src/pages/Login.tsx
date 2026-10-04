// @ts-nocheck
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonText,
} from '@ionic/react';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await login(email, password); 
      navigate('/tabs/contactos', { replace: true });
    } catch (err) {
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
            placeholder="tucorreo@mail.com"
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
          Entrar
        </IonButton>

        <IonText>
          <p className="ion-text-center">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;
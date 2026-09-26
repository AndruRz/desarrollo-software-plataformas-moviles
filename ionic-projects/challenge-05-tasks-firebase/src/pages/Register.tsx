// @ts-nocheck
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonText,
} from '@ionic/react';
import { useAuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      await register(email, password); // crea el usuario en Firebase
      navigate('/tareas', { replace: true });
    } catch (err) {
      setError('No se pudo crear la cuenta. Revisa el correo o usa una contraseña de al menos 6 caracteres.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear cuenta</IonTitle>
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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value)}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p className="ion-padding-start">{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleRegister}>
          Crear cuenta
        </IonButton>

        <IonText>
          <p className="ion-text-center">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;
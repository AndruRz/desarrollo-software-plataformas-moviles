import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonButton, IonInput, IonItem, IonList, IonSpinner, IonText } from '@ionic/react';

export type AuthFormValues = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  mode: 'login' | 'register';
  loading: boolean;
  error: string;
  onSubmit: (values: AuthFormValues) => void;
};

const AuthForm = ({ mode, loading, error, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isRegister = mode === 'register';
  const valid = email.trim() !== '' && password.length >= 6 && (!isRegister || name.trim() !== '');

  const handleSubmit = () => {
    if (valid && !loading) onSubmit({ name, email: email.trim(), password });
  };

  return (
    <>
      <IonList>
        {isRegister && (
          <IonItem>
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              placeholder="Cómo te verán en el ranking"
              value={name}
              onIonInput={(e) => setName(String(e.detail.value ?? ''))}
            />
          </IonItem>
        )}
        <IonItem>
          <IonInput
            label="Email"
            labelPlacement="stacked"
            type="email"
            placeholder="tucorreo@mail.com"
            value={email}
            onIonInput={(e) => setEmail(String(e.detail.value ?? ''))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="stacked"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onIonInput={(e) => setPassword(String(e.detail.value ?? ''))}
          />
        </IonItem>
      </IonList>

      {error && (
        <IonText color="danger">
          <p className="ion-padding-horizontal">{error}</p>
        </IonText>
      )}

      <IonButton expand="block" className="ion-margin-top" disabled={!valid || loading} onClick={handleSubmit}>
        {loading ? <IonSpinner name="dots" /> : isRegister ? 'Crear cuenta' : 'Entrar'}
      </IonButton>

      <IonText>
        <p className="ion-text-center">
          {isRegister ? (
            <>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </>
          ) : (
            <>
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </>
          )}
        </p>
      </IonText>
    </>
  );
};

export default AuthForm;

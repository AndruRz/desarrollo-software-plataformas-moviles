import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/AuthForm/AuthForm';
import { iniciarSesion } from '../../services/auth/authService';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const entrar = async (email: string, password: string) => {
    try {
      setError(null);
      await iniciarSesion(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado');
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
        <AuthForm etiquetaBoton="Entrar" alEnviar={entrar} />
        {error && (
          <IonText color="danger">
            <p className="ion-text-center">{error}</p>
          </IonText>
        )}
        <p className="ion-text-center">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;

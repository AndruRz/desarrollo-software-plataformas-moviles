import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/AuthForm/AuthForm';
import { registrar } from '../../services/auth/authService';

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const crearCuenta = async (email: string, password: string, nombre: string) => {
    try {
      setError(null);
      setMensaje(null);
      await registrar(email, password, nombre);
      setMensaje('Revisa tu correo para confirmar la cuenta');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado');
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
        <AuthForm etiquetaBoton="Registrarme" pedirNombre alEnviar={crearCuenta} />
        {error && (
          <IonText color="danger">
            <p className="ion-text-center">{error}</p>
          </IonText>
        )}
        {mensaje && (
          <IonText color="success">
            <p className="ion-text-center">{mensaje}</p>
          </IonText>
        )}
        <p className="ion-text-center">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AuthForm, { type AuthFormValues } from '../../components/AuthForm/AuthForm';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import { authErrorMessage } from '../../helpers/authError/authError';

const Register = () => {
  const navigate = useNavigate();
  const { user, register } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to="/tabs/misiones" replace />;

  const handleSubmit = async ({ name, email, password }: AuthFormValues) => {
    setError('');
    setLoading(true);
    try {
      await register(email, password, name);
      navigate('/tabs/misiones', { replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
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
        <AuthForm mode="register" loading={loading} error={error} onSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default Register;

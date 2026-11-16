import { IonButton, IonInput, IonItem, IonList, IonSpinner } from '@ionic/react';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface AuthFormProps {
  etiquetaBoton: string;
  pedirNombre?: boolean;
  alEnviar: (email: string, password: string, nombre: string) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ etiquetaBoton, pedirNombre = false, alEnviar }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (evento: FormEvent) => {
    evento.preventDefault();
    setEnviando(true);
    try {
      await alEnviar(email.trim(), password, nombre.trim());
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviar}>
      <IonList inset>
        {pedirNombre && (
          <IonItem>
            <IonInput
              label="Nombre"
              labelPlacement="floating"
              value={nombre}
              required
              onIonInput={(e) => setNombre(String(e.detail.value ?? ''))}
            />
          </IonItem>
        )}
        <IonItem>
          <IonInput
            label="Correo"
            labelPlacement="floating"
            type="email"
            value={email}
            required
            onIonInput={(e) => setEmail(String(e.detail.value ?? ''))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            type="password"
            value={password}
            minlength={6}
            required
            onIonInput={(e) => setPassword(String(e.detail.value ?? ''))}
          />
        </IonItem>
      </IonList>
      <div className="ion-padding-horizontal">
        <IonButton expand="block" type="submit" disabled={enviando}>
          {enviando ? <IonSpinner name="dots" /> : etiquetaBoton}
        </IonButton>
      </div>
    </form>
  );
};

export default AuthForm;

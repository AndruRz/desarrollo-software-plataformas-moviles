import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface TareaFormProps {
  alCrear: (titulo: string) => Promise<void>;
}

const TareaForm: React.FC<TareaFormProps> = ({ alCrear }) => {
  const [titulo, setTitulo] = useState('');

  const enviar = async (evento: FormEvent) => {
    evento.preventDefault();
    const limpio = titulo.trim();
    if (!limpio) return;
    setTitulo('');
    await alCrear(limpio);
  };

  return (
    <form onSubmit={enviar}>
      <IonItem>
        <IonInput
          placeholder="Nueva tarea"
          value={titulo}
          onIonInput={(e) => setTitulo(String(e.detail.value ?? ''))}
        />
        <IonButton slot="end" type="submit" fill="clear" aria-label="Agregar tarea">
          <IonIcon slot="icon-only" icon={add} />
        </IonButton>
      </IonItem>
    </form>
  );
};

export default TareaForm;

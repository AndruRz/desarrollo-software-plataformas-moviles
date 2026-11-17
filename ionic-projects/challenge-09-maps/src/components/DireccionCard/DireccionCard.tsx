import { IonCard, IonCardContent, IonIcon, IonNote } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';

interface DireccionCardProps {
  direccion: string | null;
  error: string | null;
  conectado: boolean;
}

const DireccionCard: React.FC<DireccionCardProps> = ({ direccion, error, conectado }) => {
  let contenido = 'Buscando dirección…';
  if (!conectado)
    contenido = direccion ? `${direccion} (última conocida)` : 'Sin conexión: no se puede obtener la dirección';
  else if (direccion) contenido = direccion;
  else if (error) contenido = error;

  return (
    <IonCard>
      <IonCardContent>
        <IonIcon icon={locationOutline} /> <IonNote color="dark">{contenido}</IonNote>
      </IonCardContent>
    </IonCard>
  );
};

export default DireccionCard;

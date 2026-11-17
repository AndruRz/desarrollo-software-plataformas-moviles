import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/react';

const FotoCard: React.FC<{ foto: string | null }> = ({ foto }) => {
  if (!foto) return null;
  return (
    <IonCard>
      <img src={foto} alt="Foto con ubicación" style={{ width: '100%' }} />
      <IonCardHeader>
        <IonCardSubtitle>Foto guardada con la ubicación como marca de agua</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default FotoCard;

import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useMemo } from 'react';

import type { MotivoFin, Recorrido } from '../../types/Recorrido';
import { formatearDistancia, formatearDuracion, horaCorta } from '../../utils/geo';
import MapaView from '../MapaView/MapaView';

const etiquetaMotivo: Record<MotivoFin, string> = {
  manual: 'Detenido por ti',
  bateria: 'Batería baja',
  quieto: 'Sin movimiento',
};

const RecorridoCard: React.FC<{ recorrido: Recorrido }> = ({ recorrido }) => {
  const ruta = useMemo(() => recorrido.puntos.map(({ lat, lng }) => ({ lat, lng })), [recorrido.puntos]);

  return (
    <IonCard>
      <MapaView ruta={ruta} seguir={false} altura={180} />
      <IonCardHeader>
        <IonCardTitle>
          {horaCorta(recorrido.inicio)} – {horaCorta(recorrido.fin)}
        </IonCardTitle>
        <IonCardSubtitle>
          {formatearDistancia(recorrido.distanciaM)} · {formatearDuracion(recorrido.fin - recorrido.inicio)}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonBadge color={recorrido.motivoFin === 'manual' ? 'medium' : 'warning'}>
          {etiquetaMotivo[recorrido.motivoFin]}
        </IonBadge>
      </IonCardContent>
    </IonCard>
  );
};

export default RecorridoCard;

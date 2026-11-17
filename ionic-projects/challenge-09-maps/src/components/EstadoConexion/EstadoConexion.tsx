import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import { cellular, cloudOffline, help, wifi } from 'ionicons/icons';

import type { EstadoRed } from '../../services/red/redService';

const configuracion = {
  wifi: { icono: wifi, texto: 'Wi-Fi', color: 'success' },
  cellular: { icono: cellular, texto: 'Datos móviles', color: 'primary' },
  none: { icono: cloudOffline, texto: 'Sin conexión', color: 'danger' },
  unknown: { icono: help, texto: 'Conexión desconocida', color: 'medium' },
} as const;

const EstadoConexion: React.FC<{ red: EstadoRed }> = ({ red }) => {
  const { icono, texto, color } = configuracion[red.conectado ? red.tipo : 'none'];
  return (
    <IonChip color={color}>
      <IonIcon icon={icono} />
      <IonLabel>{texto}</IonLabel>
    </IonChip>
  );
};

export default EstadoConexion;

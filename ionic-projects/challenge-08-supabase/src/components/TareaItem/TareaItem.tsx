import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import { create, trash } from 'ionicons/icons';

import type { Tarea } from '../../types/Tarea/Tarea';

interface TareaItemProps {
  tarea: Tarea;
  alCompletar: (id: number, valor: boolean) => void;
  alEditar: (tarea: Tarea) => void;
  alBorrar: (id: number) => void;
}

const TareaItem: React.FC<TareaItemProps> = ({ tarea, alCompletar, alEditar, alBorrar }) => (
  <IonItemSliding>
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={tarea.completada}
        onIonChange={(e) => alCompletar(tarea.id, e.detail.checked)}
      />
      <IonLabel style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }} className="ion-text-wrap">
        {tarea.titulo}
      </IonLabel>
    </IonItem>
    <IonItemOptions side="end">
      <IonItemOption color="primary" onClick={() => alEditar(tarea)}>
        <IonIcon slot="icon-only" icon={create} />
      </IonItemOption>
      <IonItemOption color="danger" onClick={() => alBorrar(tarea.id)}>
        <IonIcon slot="icon-only" icon={trash} />
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
);

export default TareaItem;

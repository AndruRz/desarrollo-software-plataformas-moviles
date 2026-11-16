import { IonList, IonNote, IonSpinner } from '@ionic/react';

import type { Tarea } from '../../types/Tarea/Tarea';
import TareaItem from '../TareaItem/TareaItem';

interface TareaListProps {
  tareas: Tarea[];
  cargando: boolean;
  alCompletar: (id: number, valor: boolean) => void;
  alEditar: (tarea: Tarea) => void;
  alBorrar: (id: number) => void;
}

const TareaList: React.FC<TareaListProps> = ({ tareas, cargando, alCompletar, alEditar, alBorrar }) => {
  if (cargando) {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner />
      </div>
    );
  }

  if (tareas.length === 0) {
    return (
      <div className="ion-text-center ion-padding">
        <IonNote>No tienes tareas todavía</IonNote>
      </div>
    );
  }

  return (
    <IonList>
      {tareas.map((tarea) => (
        <TareaItem key={tarea.id} tarea={tarea} alCompletar={alCompletar} alEditar={alEditar} alBorrar={alBorrar} />
      ))}
    </IonList>
  );
};

export default TareaList;

// @ts-nocheck
import { useState } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

const TaskForm = ({ onAddTask }) => {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = () => {
    if (titulo.trim() === '') return;
    onAddTask({ id: Date.now(), titulo, completada: false });
    setTitulo('');
  };

  return (
    <div className="task-form">
      <IonItem>
        <IonInput
          label="Nueva tarea"
          labelPlacement="stacked"
          placeholder="¿Qué hay que hacer?"
          value={titulo}
          onIonInput={(e) => setTitulo(e.detail.value)}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit}>
        Agregar tarea
      </IonButton>
    </div>
  );
};

export default TaskForm;
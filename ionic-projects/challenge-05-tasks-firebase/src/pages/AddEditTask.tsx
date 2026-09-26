// @ts-nocheck
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonInput, IonButton,
} from '@ionic/react';
import { useTasksContext } from '../context/TasksContext';

const AddEditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tareas, agregarTarea, editarTarea } = useTasksContext();

  const tareaExistente = id ? tareas.find((t) => t.id === Number(id)) : null;
  const [titulo, setTitulo] = useState('');

  // Si estamos editando, precargamos el título de la tarea encontrada.
  useEffect(() => {
    if (tareaExistente) setTitulo(tareaExistente.titulo);
  }, [tareaExistente]);

  const handleSubmit = () => {
    if (titulo.trim() === '') return;

    if (tareaExistente) {
      editarTarea(tareaExistente.id, { titulo });
    } else {
      agregarTarea({ titulo });
    }
    navigate('/tareas');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tareas" />
          </IonButtons>
          <IonTitle>{tareaExistente ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Título"
            labelPlacement="stacked"
            placeholder="¿Qué hay que hacer?"
            value={titulo}
            onIonInput={(e) => setTitulo(e.detail.value)}
          />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
          {tareaExistente ? 'Guardar cambios' : 'Agregar tarea'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddEditTask;
import { useState } from 'react';
import { IonButton, IonItem, IonInput, IonList, IonLabel, IonText, IonNote } from '@ionic/react';
import SensorPage from '../components/SensorPage';
import useFilesystem from '../hooks/useFilesystem';

const FILE_PATH = 'mi-data.json';

const FilesystemPage = () => {
  const [nombre, setNombre] = useState('Andre');
  const [curso, setCurso] = useState('Ionic');
  const [contenido, setContenido] = useState<string>('');
  const [archivos, setArchivos] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const { loading, error, writeFile, readFile, deleteFile, listFiles } = useFilesystem();

  const onWrite = async () => {
    const ok = await writeFile({ path: FILE_PATH, data: { nombre, curso } });
    setMensaje(ok ? 'Archivo guardado' : '');
  };

  const onRead = async () => {
    const data = await readFile({ path: FILE_PATH });
    setContenido(data ? JSON.stringify(data, null, 2) : '');
    setMensaje(data ? 'Archivo leído' : '');
  };

  const onList = async () => {
    const files = await listFiles();
    setArchivos(files);
    setMensaje(`${files.length} archivo(s)`);
  };

  const onDelete = async () => {
    const ok = await deleteFile({ path: FILE_PATH });
    if (ok) {
      setContenido('');
      setMensaje('Archivo eliminado');
    }
  };

  return (
    <SensorPage title="Archivos" error={error}>
      <IonItem>
        <IonInput
          label="Nombre"
          labelPlacement="stacked"
          value={nombre}
          onIonInput={(e) => setNombre(e.detail.value ?? '')}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label="Curso"
          labelPlacement="stacked"
          value={curso}
          onIonInput={(e) => setCurso(e.detail.value ?? '')}
        />
      </IonItem>

      <IonButton expand="block" className="ion-margin-top" onClick={onWrite} disabled={loading}>
        Escribir archivo
      </IonButton>
      <IonButton expand="block" onClick={onRead} disabled={loading}>
        Leer archivo
      </IonButton>
      <IonButton expand="block" onClick={onList} disabled={loading}>
        Listar archivos
      </IonButton>
      <IonButton expand="block" color="danger" onClick={onDelete} disabled={loading}>
        Eliminar archivo
      </IonButton>

      {mensaje && (
        <IonText color="success">
          <p>{mensaje}</p>
        </IonText>
      )}

      {contenido && (
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <p>Contenido de {FILE_PATH}</p>
            <pre>{contenido}</pre>
          </IonLabel>
        </IonItem>
      )}

      {archivos.length > 0 && (
        <IonList>
          {archivos.map((archivo) => (
            <IonItem key={archivo}>
              <IonLabel>{archivo}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}

      {!contenido && archivos.length === 0 && (
        <IonNote>
          <p>Escribe, lee, lista o elimina un archivo guardado en el dispositivo.</p>
        </IonNote>
      )}
    </SensorPage>
  );
};

export default FilesystemPage;

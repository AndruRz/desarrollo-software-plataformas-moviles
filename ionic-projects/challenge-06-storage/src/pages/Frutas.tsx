import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonIcon,
  IonText,
  IonSearchbar,
  IonNote,
} from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import useDexie from '../hooks/useDexie';
import type { Fruta } from '../db/dexie';

const Frutas = () => {
  const [nombre, setNombre] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [fechaCosecha, setFechaCosecha] = useState('');
  const [editando, setEditando] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const { results, isPending, error, add, update, deleteItem } = useDexie<Fruta>(
    'frutas',
    busqueda ? (f) => f.nombre.toLowerCase().includes(busqueda.toLowerCase()) : null,
    [busqueda],
  );

  const limpiar = () => {
    setNombre('');
    setProveedor('');
    setFechaCosecha('');
    setEditando(null);
  };

  const handleGuardar = async () => {
    if (!nombre.trim()) return;
    const data = { nombre: nombre.trim(), proveedor: proveedor.trim(), fechaCosecha };
    if (editando !== null) await update(editando, data);
    else await add(data);
    limpiar();
  };

  const handleEditar = (f: Fruta) => {
    setEditando(f.id ?? null);
    setNombre(f.nombre);
    setProveedor(f.proveedor ?? '');
    setFechaCosecha(f.fechaCosecha ?? '');
  };

  return (
    <IonPage>
      <AppHeader title="Frutas (Dexie)" />

      <IonContent className="ion-padding">
        <IonText color="medium">
          <p>Se guardan en el dispositivo, así que funcionan sin internet.</p>
        </IonText>

        <IonItem>
          <IonInput
            label="Nombre de la fruta"
            labelPlacement="stacked"
            placeholder="Ej: Mango"
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Proveedor"
            labelPlacement="stacked"
            placeholder="Ej: Finca La Esperanza"
            value={proveedor}
            onIonInput={(e) => setProveedor(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Fecha de cosecha"
            labelPlacement="stacked"
            type="date"
            value={fechaCosecha}
            onIonInput={(e) => setFechaCosecha(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleGuardar} disabled={isPending}>
          {editando !== null ? 'Actualizar fruta' : 'Agregar fruta'}
        </IonButton>
        {editando !== null && (
          <IonButton expand="block" fill="outline" onClick={limpiar}>
            Cancelar edición
          </IonButton>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonSearchbar
          className="ion-margin-top"
          placeholder="Buscar fruta"
          value={busqueda}
          onIonInput={(e) => setBusqueda(e.detail.value ?? '')}
        />

        <IonList>
          {results.map((f) => (
            <IonItem key={f.id}>
              <IonLabel>
                <h2>{f.nombre}</h2>
                <p>
                  {f.proveedor || 'Sin proveedor'}
                  {f.fechaCosecha ? ` · Cosecha: ${f.fechaCosecha}` : ''}
                </p>
              </IonLabel>
              <IonButtons slot="end">
                <IonButton onClick={() => handleEditar(f)}>
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonButton>
                <IonButton color="danger" onClick={() => f.id !== undefined && deleteItem(f.id)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>

        {results.length === 0 && (
          <IonNote>
            <p>{busqueda ? 'No hay frutas con ese nombre.' : 'No hay frutas todavía.'}</p>
          </IonNote>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Frutas;

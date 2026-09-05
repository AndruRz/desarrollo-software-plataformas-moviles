// @ts-nocheck
import { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Loader from '../components/Loader';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import './Home.css';

const Home = () => {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: 1, nombre: 'André Rodriguez', telefono: '300 123 4567' },
        { id: 2, nombre: 'Pablo Pérez', telefono: '311 987 6543' },
        { id: 3, nombre: 'Lina Ospina', telefono: '320 456 7890' },
      ]);
      setCargando(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cargando ? (
          <Loader />
        ) : (
          <>
            <ContactForm onAddContact={agregarContacto} />
            <ContactList contactos={contactos} onDelete={eliminarContacto} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
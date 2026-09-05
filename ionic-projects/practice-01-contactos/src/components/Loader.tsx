// @ts-nocheck
import { IonSpinner } from '@ionic/react';

const Loader = () => {
  return (
    <div className="loader">
      <IonSpinner name="crescent" />
      <p>Cargando contactos...</p>
    </div>
  );
};

export default Loader;
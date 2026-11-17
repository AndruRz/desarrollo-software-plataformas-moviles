import { useEffect } from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';

import type { Coord } from '../../utils/geo';

export interface Marcador extends Coord {
  titulo: string;
}

interface MapaViewProps {
  /** Posición actual: se dibuja como punto azul. */
  centro?: Coord | null;
  ruta?: Coord[];
  marcadores?: Marcador[];
  /** true: el mapa sigue a `centro`. false: se ajusta para mostrar toda la `ruta`. */
  seguir?: boolean;
  altura?: number | string;
}

const CALI: Coord = { lat: 3.4516, lng: -76.532 };

interface AjusteProps {
  centro?: Coord | null;
  ruta: Coord[];
  seguir: boolean;
}

const AjustarVista: React.FC<AjusteProps> = ({ centro, ruta, seguir }) => {
  const mapa = useMap();
  const lat = centro?.lat;
  const lng = centro?.lng;

  // Dentro de una página de Ionic el contenedor cambia de tamaño al animar: se recalcula el mapa.
  useEffect(() => {
    const id = setTimeout(() => mapa.invalidateSize(), 300);
    return () => clearTimeout(id);
  }, [mapa]);

  useEffect(() => {
    if (seguir && lat !== undefined && lng !== undefined) {
      mapa.setView([lat, lng], Math.max(mapa.getZoom(), 16));
    } else if (!seguir && ruta.length > 1) {
      mapa.fitBounds(
        ruta.map((p) => [p.lat, p.lng] as [number, number]),
        { padding: [24, 24] },
      );
    }
  }, [mapa, lat, lng, ruta, seguir]);

  return null;
};

const MapaView: React.FC<MapaViewProps> = ({ centro, ruta = [], marcadores = [], seguir = true, altura = '40vh' }) => {
  const inicial = centro ?? ruta[0] ?? marcadores[0] ?? CALI;

  return (
    <div style={{ height: altura, width: '100%' }}>
      <MapContainer center={[inicial.lat, inicial.lng]} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ruta.length > 1 && <Polyline positions={ruta.map((p) => [p.lat, p.lng])} color="#3880ff" weight={5} />}
        {marcadores.map((m) => (
          <CircleMarker
            key={`${m.lat},${m.lng},${m.titulo}`}
            center={[m.lat, m.lng]}
            radius={9}
            pathOptions={{ color: '#eb445a', fillOpacity: 0.8 }}
          >
            <Popup>{m.titulo}</Popup>
          </CircleMarker>
        ))}
        {centro && (
          <CircleMarker
            center={[centro.lat, centro.lng]}
            radius={8}
            pathOptions={{ color: '#ffffff', fillColor: '#3880ff', fillOpacity: 1, weight: 3 }}
          />
        )}
        <AjustarVista centro={centro} ruta={ruta} seguir={seguir} />
      </MapContainer>
    </div>
  );
};

export default MapaView;

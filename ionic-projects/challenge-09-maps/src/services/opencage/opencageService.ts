import { distanciaM } from '../../utils/geo';

const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';
const LLAVE = import.meta.env.VITE_OPENCAGE_KEY;

export const hayLlaveOpenCage = (): boolean => Boolean(LLAVE);

interface ResultadoOpenCage {
  formatted: string;
  geometry: { lat: number; lng: number };
}

export interface Lugar {
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
  distanciaM: number;
}

const consultar = async (parametros: Record<string, string>): Promise<ResultadoOpenCage[]> => {
  if (!LLAVE) throw new Error('Falta VITE_OPENCAGE_KEY en el archivo .env');
  const consulta = new URLSearchParams({ ...parametros, key: LLAVE, language: 'es', no_annotations: '1' });
  const respuesta = await fetch(`${BASE_URL}?${consulta.toString()}`);
  if (!respuesta.ok) {
    if (respuesta.status === 402 || respuesta.status === 429)
      throw new Error('Se agotó el límite de consultas de OpenCage');
    throw new Error(`Error de OpenCage (${respuesta.status})`);
  }
  const json = (await respuesta.json()) as { results: ResultadoOpenCage[] };
  return json.results;
};

/** Geocodificación inversa: de coordenadas a dirección. */
export const direccionDe = async (lat: number, lng: number): Promise<string> => {
  const resultados = await consultar({ q: `${lat},${lng}`, limit: '1' });
  return resultados[0]?.formatted ?? 'Dirección no disponible';
};

/** Busca un tipo de lugar (ej. "restaurante") cerca de la posición y los ordena por distancia. */
export const lugaresCercanos = async (lat: number, lng: number, tipo: string): Promise<Lugar[]> => {
  const margen = 0.05; // ≈ 5 km
  const resultados = await consultar({
    q: tipo,
    proximity: `${lat},${lng}`,
    bounds: `${lng - margen},${lat - margen},${lng + margen},${lat + margen}`,
    limit: '10',
  });
  return resultados
    .map((r) => {
      const [nombre, ...resto] = r.formatted.split(',');
      return {
        nombre: nombre.trim(),
        direccion: resto.join(',').trim(),
        lat: r.geometry.lat,
        lng: r.geometry.lng,
        distanciaM: distanciaM({ lat, lng }, r.geometry),
      };
    })
    .sort((a, b) => a.distanciaM - b.distanciaM);
};

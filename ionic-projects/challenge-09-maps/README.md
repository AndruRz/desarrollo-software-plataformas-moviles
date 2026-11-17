# Challenge 09 – Mapa y Sensores (Ionic React + Capacitor)

App de mapas con tracking y sensores del celular.

| Función | Plugin / API |
|---|---|
| Mapa y ruta | Leaflet + react-leaflet (OpenStreetMap) |
| Posición y tracking | `@capacitor/geolocation` (`getCurrentPosition`, `watchPosition`) |
| Wi-Fi / datos / sin conexión | `@capacitor/network` |
| Dirección actual y lugares cercanos | API de OpenCage |
| Inicio/paro automático por movimiento | GPS (distancia y velocidad) |
| Guardar recorridos en JSON (un archivo por día) | `@capacitor/filesystem` |
| Página de historial por día | `useIonViewWillEnter` + Filesystem |
| Foto con ubicación como marca de agua | `@capacitor/camera` + canvas |
| Vibrar al iniciar | `@capacitor/haptics` |
| Detener con batería baja (≤ 15 %) | `@capacitor/device` |
| Notificaciones inteligentes (quieto, sin conexión, muy rápido) | `@capacitor/local-notifications` |

## Instalar y correr

```bash
npm install
copy .env.example .env      # y pon tu llave VITE_OPENCAGE_KEY
npm run build
npx cap sync android
npx cap run android --list
npx cap run android --target <ID>
```

El `.env` se incrusta al compilar: si lo cambias, repite `npm run build` y `npx cap sync android`.

## Reglas de movimiento (`src/utils/movimiento.ts`)

- Movimiento: te alejas 15 m del último punto o la velocidad es ≥ 1 m/s.
- Modo automático: inicia al detectar movimiento y se detiene tras 60 s quieto.
- Aviso "mucho tiempo sin moverte": 2 min quieto grabando.
- Aviso de velocidad: ≥ 8 m/s (≈ 29 km/h).
- Batería baja: ≤ 15 % sin cargar (no inicia y detiene el recorrido).

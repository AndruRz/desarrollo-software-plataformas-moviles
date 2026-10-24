# Parcial 2 - Misiones (Ionic React + Capacitor)

App donde usuarios reales se registran, completan 3 misiones con sensores del celular y ganan puntos.

## Misiones

| Id | Misión | Sensor | Puntos |
|----|--------|--------|--------|
| 1 | Evidencia: tomar y guardar una foto | Camera + Filesystem | 30 |
| 2 | Movimiento real: alejarse 50 m del punto de inicio | Geolocation | 40 |
| 3 | Permanencia activa: 10 s quieto y vibra | Motion (acelerómetro) + Haptics | 50 |

La misión 3 se habilita al completar la misión 2. Total: 120 puntos.

## Estructura

```
src/
  components/   un componente por carpeta (tarjetas, paneles de misión, ranking, resultados)
  constants/    configuración (distancia, segundos, tolerancia) y definición de misiones
  context/      AuthContext y MissionsContext (useReducer)
  firebase/     inicialización de Firebase
  helpers/      funciones puras (distancia, progreso, ranking, errores)
  hooks/        un hook por sensor/funcionalidad
  pages/        Login, Register, Missions, Ranking, Results
  routes/       AppRoutes, MainTabs, RutaPrivada
  services/     localStorage, progreso en Firebase, ranking en Firebase
  types/
```

## Firebase

Auth con correo y contraseña habilitado. Agregar estas ramas a las reglas de Realtime Database sin borrar las existentes:

```json
{
  "rules": {
    "progress": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "ranking": {
      ".read": "auth != null",
      ".indexOn": ["points"],
      "$uid": {
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```

Datos guardados:

- `progress/{uid}`: `{ "points": 120, "missions": [{ "id": 1, "completed": true }] }`
- `ranking/{uid}`: `{ "name": "Andre", "points": 120, "updatedAt": 1761000000000 }`

## Permisos Android

Dentro de `<manifest>` en `android/app/src/main/AndroidManifest.xml`, junto a `INTERNET`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.location.gps" android:required="false" />
```

## Comandos

```bash
npm install
npm run dev
npm run build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

## Ajustes rápidos

Todo en `src/constants/config.ts`: distancia (`MOVE_DISTANCE_METERS`), segundos quieto (`STILL_SECONDS`), sensibilidad al movimiento (`STILL_TOLERANCE`) y precisión mínima del GPS (`MAX_GPS_ACCURACY_METERS`).

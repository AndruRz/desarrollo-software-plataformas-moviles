# Desarrollo de Software para Plataformas Móviles — Portafolio de Desafíos

Repositorio y portafolio de los desafíos de la asignatura. Cada desafío vive en su propia rama de git y tiene su propia carpeta dentro del proyecto. La página principal los muestra automáticamente como tarjetas, con su descripción, instrucciones, fecha de entrega, rama y un link directo a GitHub.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

Para compilar la versión de producción:

```bash
npm run build
```

## Cómo funciona

Todo gira alrededor de un solo archivo: **`src/data/challenges.js`**. Ese archivo es la única fuente de verdad — un arreglo con un objeto por desafío. La página principal (`src/pages/Home.jsx`) recorre ese arreglo y genera las tarjetas solas; nunca hay que tocar el código de la página principal para agregar contenido nuevo.

Cada desafío, además, vive en su propia carpeta dentro de `src/challenges/`, aislado del resto:


src/
├── data/
│ └── challenges.js # Registro central: un objeto por desafío
├── challenges/
│ └── Challenge_01/
│ ├── index.jsx # Componente que se muestra en la vista previa
│ ├── style.css
│ └── components/ # Componentes internos propios del reto
├── pages/
│ ├── Home.jsx # Portafolio: lista todas las tarjetas
│ └── ChallengeView.jsx # Detalle de un desafío (instrucciones + vista previa en vivo)
├── components/
│ ├── ChallengeCard.jsx # Tarjeta individual en la home
│ ├── BranchPill.jsx # Etiqueta de rama estilo git
│ └── Terminal.jsx # Bloque de terminal animado del hero
└── App.jsx # Rutas: "/" y "/desafio/:slug"


## Cómo agregar un desafío nuevo

1. Crea la carpeta `src/challenges/Challenge_XX/` con un `index.jsx` que exporte por defecto el componente con la solución. Si quieres dividirlo en más piezas, agrega una subcarpeta `components/` adentro — es libre.
2. Crea la rama de git correspondiente:
```bash
   git checkout -b challenge-XX
```
3. Agrega una entrada nueva al arreglo `challenges` en `src/data/challenges.js`, copiando el bloque de un desafío anterior y cambiando: `slug`, `number`, `title`, `summary`, `instructions` (el enunciado tal como lo dio el docente), `dueDate`, `branch`, y el `import()` del `lazy()`.
4. Guarda, corre `npm run dev`, y la tarjeta nueva aparece sola en la principal.

## Stack

- React 19 + Vite
- React Router (rutas `/` y `/desafio/:slug`)
- CSS plano con variables (tema oscuro, estética "git graph")
## PWA — Despliegue e instalación

El portafolio está desplegado como PWA en Netlify:

🔗 **https://portafoliodesarrollosoftwareappmovil.netlify.app/**

### Cómo instalarlo en el celular

**Android (Chrome):**
1. Abre el link de Netlify en Chrome.
2. Toca el menú de tres puntos (⋮) arriba a la derecha.
3. Selecciona **"Instalar app"** o **"Agregar a pantalla de inicio"**.
4. Confirma. El ícono de la app aparecerá en tu pantalla de inicio y se abrirá en modo standalone (sin la barra del navegador).

**iOS (Safari):**
1. Abre el link de Netlify en Safari.
2. Toca el botón de compartir (el cuadro con la flecha hacia arriba).
3. Selecciona **"Agregar a inicio"** (Add to Home Screen).
4. Confirma. El ícono aparecerá en tu pantalla de inicio.

import { lazy } from 'react'

export const REPO_URL =
  'https://github.com/AndruRz/desarrollo-software-plataformas-moviles'

  export const challenges = [

    export const challenges = [

    {
      slug: 'challenge-01',
      number: '01',
      title: 'Challenge 01',
      summary:
        'App en React para listar, agregar y eliminar contactos, simulando una carga inicial de datos.',
      instructions: [
        'Build a React app that allows you to list, add, and delete contacts, simulating initial data loading, using the basic concepts that will later be used in Ionic.',
        'Display a loader on startup.',
        'Load an initial contact list.',
        'Allow users to add contacts with name and phone.',
        'Allow users to delete contacts.',
        'Divide the app into components.',
      ],
      dueDate: '8 de Agosto de 2026',
      branch: 'challenge-01',
      status: 'submitted',
      Component: lazy(() => import('../challenges/Challenge_01')),
    },

    {
      slug: 'challenge-02',
      number: '02',
      title: 'Challenge 02',
      summary:
        'Transformacion de la app del Challenge 01 en una PWA instalable, con estrategia hibrida de cache e icono personalizado.',
      instructions: [
        'Based on the React app from the Challenge 01:',
        'Add one image to your parent component.',
        'Transform it into a PWA using Hybrid Strategy.',
        'Add a custom icon.',
        'Deploy the PWA in Netlify.',
        'Add the Netlify Link to the Readme.md and describe how to install the app in the cellphone.',
      ],
      dueDate: '29 de Agosto de 2026',
      branch: 'challenge-02',
      status: 'submitted',
      Component: lazy(() => import('../challenges/Challenge_02')),
      pwaUrl: 'https://portafoliodesarrollosoftwareappmovil.netlify.app/',
      installGuide: [
        {
          platform: 'Android (Chrome)',
          steps: [
            'Abre el link de Netlify en Chrome.',
            'Toca el menú de tres puntos (⋮) arriba a la derecha.',
            'Selecciona "Instalar app" o "Agregar a pantalla de inicio".',
            'Confirma. El ícono de la app aparecerá en tu pantalla de inicio y se abrirá en modo standalone (sin la barra del navegador).',
          ],
        },
        {
          platform: 'iOS (Safari)',
          steps: [
            'Abre el link de Netlify en Safari.',
            'Toca el botón de compartir (el cuadro con la flecha hacia arriba).',
            'Selecciona "Agregar a inicio" (Add to Home Screen).',
            'Confirma. El ícono aparecerá en tu pantalla de inicio.',
          ],
        },
      ],
    },

    {
      slug: 'practice-01',
      number: '01',
      title: 'Practice 01 (Ionic)',
      summary:
        'Migración de la app de contactos del Challenge 01 a Ionic, usando solo componentes de Ionic (IonList, IonItem, IonInput, IonButton). Instalada y probada en un celular Android real vía Capacitor.',
      instructions: [
        'Once the environments is installed, let´s practice into ionic:',
        'Based on the React app from the Challenge 01:',
        'It’s not necessary to uninstall your PWA.',
        'Let’s migrate your app to ionic using only ionic components.',
        'Verify that the app continues working, installing it in your phone.',
      ],
      dueDate: '04 de Septiembre de 2026',
      branch: 'practice-01',
      status: 'submitted',
      appUrl: '/downloads/app-debug.apk',
      notes: [
        '"Unsupported class file major version 70": Gradle falló porque el JDK por defecto del sistema era Java 26, incompatible con Gradle 8.14.3. Se solucionó apuntando JAVA_HOME al JDK 17 que trae Android Studio y agregando org.gradle.java.home en android/gradle.properties.',
        '"SDK location not found": faltaba el archivo android/local.properties. Se solucionó creándolo con sdk.dir apuntando a la ruta del Android SDK.',
      ],
      screenshots: [
        {
          src: '/screenshots/practice-01/icono-instalado.jpeg',
          caption: 'App instalada como app nativa en un Samsung SM-A566E vía Capacitor.',
        },
        {
          src: '/screenshots/practice-01/contactos-funcionando.jpeg',
          caption: 'Agregar y eliminar contactos funcionando en el dispositivo real, con componentes de Ionic.',
        },
      ],
    },

    {
      slug: 'challenge-03',
      number: '03',
      title: 'Challenge 03 (Ionic Task Manager)',
      summary:
        'App de gestión de tareas construida en Ionic desde cero: listar, agregar, marcar como completadas y eliminar tareas, con componentes padre-hijo (TaskForm, TaskList, TaskItem). Instalada y probada en un celular Android real vía Capacitor.',
      instructions: [
        'Create a new Task Manager app in ionic.',
        'It should contain:',
        'States and effects, if it’s necessary.',
        'Child and parent components – at least 3 components.',
        'View a task list',
        'Add new tasks',
        'Mark tasks as completed',
        'Delete tasks',
      ],
      dueDate: '05 de Septiembre de 2026',
      branch: 'challenge-03',
      status: 'submitted',
      appUrl: '/downloads/challenge-03-tasks.apk',
      notes: [
        'Estructura de componentes padre-hijo: Home (estado de la lista con useState) → TaskForm (agregar) y TaskList (renderiza) → TaskItem (marcar completada / eliminar).',
      ],
      screenshots: [
        {
          src: '/screenshots/challenge-03/icono-instalado.jpeg',
          caption: 'App instalada como app nativa en Android vía Capacitor.',
        },
        {
          src: '/screenshots/challenge-03/tareas-funcionando.jpeg',
          caption: 'Lista de tareas con una tarea marcada como completada, en el dispositivo real.',
        },
      ],
    },

    {
      slug: 'practice-02',
      number: '02',
      title: 'Practice 02 (Detalle y Creación de Contactos)',
      summary:
        'Extensión de la app de contactos de Practice 01: 2 páginas nuevas (crear y ver detalle) con routing dinámico de Ionic React, y componentes de Ionic no usados antes (IonFab, IonItemSliding, IonCard).',
      instructions: [
        'Based on the React app from the Practice 01:',
        'Create 2 new pages to create and show details from the contacts.',
        'Use new components from ionic to enhance the app.',
      ],
      dueDate: '06 de septiembre de 2026',
      branch: 'practice-02',
      status: 'submitted',
      appUrl: '/downloads/practice-02.apk',
      screenshots: [
        {
          src: '/screenshots/practice-02/icono-instalado.jpeg',
          caption: 'App instalada como app nativa en el celular vía Capacitor.',
        },
        {
          src: '/screenshots/practice-02/lista-contactos.jpeg',
          caption: 'Lista de contactos con navegación al detalle y botón flotante (IonFab) para agregar uno nuevo.',
        },
        {
          src: '/screenshots/practice-02/detalle-contacto.jpeg',
          caption: 'Página de detalle del contacto, con opción para eliminarlo.',
        },
        {
          src: '/screenshots/practice-02/nuevo-contacto.jpeg',
          caption: 'Página para crear un nuevo contacto.',
        },
      ],
    },

    {
      slug: 'challenge-04',
      number: '04',
      title: 'Challenge 04 (Login Demo)',
      summary:
        'Página de login en Ionic con validación de credenciales fijas, token de sesión persistido en localStorage, rutas protegidas (RutaPrivada) y logout. Reutiliza las páginas de contactos de Practice 02 detrás del login.',
      instructions: [
        'Create a new Demo Login Page in ionic.',
        'It should contain: Email, Password, Button to Login.',
        'When the button is clicked, validate if the user is user@mail.com / password: 123.',
        'In that case, store a token called logged = true and redirect to List page.',
        'Next time we enter the app, check if the user is logged, then it’s not necessary to log-in again.',
        'Create a button to logout, which cleans the token and redirects to the login page.',
      ],
      dueDate: '06 de septiembre de 2026',
      branch: 'challenge-04',
      status: 'submitted',
      appUrl: '/downloads/challenge-04-login.apk',
      screenshots: [
        {
          src: '/screenshots/challenge-04/icono-instalado.jpeg',
          caption: 'App instalada como app nativa en el celular vía Capacitor.',
        },
        {
          src: '/screenshots/challenge-04/login.jpeg',
          caption: 'Pantalla de login con validación de email/contraseña.',
        },
        {
          src: '/screenshots/challenge-04/lista-contactos.jpeg',
          caption: 'Tras iniciar sesión, redirige a la lista de contactos con botón de logout.',
        },
        {
          src: '/screenshots/challenge-04/detalle-contacto.jpeg',
          caption: 'Página de detalle del contacto, protegida por la ruta privada.',
        },
        {
          src: '/screenshots/challenge-04/nuevo-contacto.jpeg',
          caption: 'Página para crear un nuevo contacto, protegida por la ruta privada.',
        },
      ],
    },

    {
      slug: 'parcial-1-pwa',
      number: '05',
      title: 'Parcial 1 — Ejercicio 1 (PWA Pacientes)',
      summary:
        'PWA en React para la clínica MediClinic: login con sesión persistida en localStorage, CRUD de pacientes con validación de nombre/apellido/CC, y buscador con el estado en el componente padre y lista filtrada enviada al componente hijo.',
      instructions: [
        'La clínica MediClinic necesita dos aplicaciones simples para gestionar pacientes y visitas médicas.',
        'Ejercicio 1 — PWA React: desarrollar una aplicación web con PWA para administración de pacientes.',
        '1. Login: usar usuarios fijos proporcionados por el desarrollador mismo.',
        'Si las credenciales son correctas, guardar el login en localStorage.',
        'Al recargar, recuperar la sesión.',
        'Permitir cerrar sesión.',
        'Si las credenciales son incorrectas, mostrar un mensaje de error en pantalla.',
        '2. Pacientes: mostrar una lista de pacientes.',
        'Crear un formulario para agregar pacientes con los campos: nombre, apellido, CC y teléfono.',
        'Validar nombre, apellido y CC.',
        'Guardar los pacientes en localStorage.',
        '3. Búsqueda: agregar un buscador por nombre, apellido o CC.',
        'El estado del buscador debe estar en el componente padre y la lista filtrada debe enviarse al componente hijo que muestra los pacientes.',
      ],
      dueDate: '12 de septiembre de 2026',
      branch: 'parcial-1-Andre-rodriguez',
      status: 'submitted',
      Component: lazy(() => import('../challenges/Parcial_1')),
      standaloneDemo: true,
      pwaUrl: 'https://portafoliodesarrollosoftwareappmovil.netlify.app/desafio/parcial-1-pwa/demo',
      installGuide: [
        {
          platform: 'Android (Chrome)',
          steps: [
            'Abre el link de Netlify en Chrome.',
            'Toca el menú de tres puntos (⋮) arriba a la derecha.',
            'Selecciona "Instalar app" o "Agregar a pantalla de inicio".',
            'Confirma. El ícono de la app aparecerá en tu pantalla de inicio y se abrirá en modo standalone (sin la barra del navegador).',
          ],
        },
        {
          platform: 'iOS (Safari)',
          steps: [
            'Abre el link de Netlify en Safari.',
            'Toca el botón de compartir (el cuadro con la flecha hacia arriba).',
            'Selecciona "Agregar a inicio" (Add to Home Screen).',
            'Confirma. El ícono aparecerá en tu pantalla de inicio.',
          ],
        },
      ],
      screenshots: [
        {
          src: '/screenshots/parcial-1-pwa/login.png',
          caption: 'Pantalla de login con validación de credenciales.',
        },
        {
          src: '/screenshots/parcial-1-pwa/pacientes.png',
          caption: 'Lista de pacientes con el formulario para agregar uno nuevo.',
        },
        {
          src: '/screenshots/parcial-1-pwa/busqueda.png',
          caption: 'Buscador filtrando pacientes por nombre, apellido o CC.',
        },
      ],
    },

    {
    slug: 'parcial-1-ionic',
    number: '06',
    title: 'Parcial 1 — Ejercicio 2 (Ionic Visitas Médicas)',
    summary:
      'App móvil en Ionic React con Tabs (Visitas, Pacientes, Perfil) para que un médico consulte sus visitas del día. Login con credenciales fijas y sesión en localStorage, cambio de estado de visita (pendiente → en camino → finalizada) persistido en localStorage. Instalada y probada en un celular Android real vía Capacitor.',
    instructions: [
      'La clínica MediClinic necesita dos aplicaciones simples para gestionar pacientes y visitas médicas.',
      'Ejercicio 2 — Ionic React: desarrollar una aplicación móvil en Ionic con Tabs para que un médico consulte sus visitas.',
      '1. Login: usar componentes de Ionic.',
      'Mostrar un IonToast cuando las credenciales sean incorrectas.',
      'Guardar la sesión en localStorage.',
      '2. Navegación: después del login, utilizar IonTabs con Visitas, Pacientes y Perfil.',
      '3. Visitas: mostrar las visitas del día, cada una con paciente, hora y estado.',
      'Al seleccionar una visita, navegar al detalle de la visita.',
      'En el detalle, permitir cambiar el estado: pendiente → en_camino → finalizada.',
      'Guardar los cambios en localStorage.',
    ],
    dueDate: '12 de septiembre de 2026',
    branch: 'parcial-1-Andre-rodriguez',
    status: 'submitted',
    appUrl: '/downloads/parcial-1-ionic.apk',
    notes: [
      'Migración de react-router-dom v5 a v6: el starter de Ionic instaló v6, así que useHistory pasó a useNavigate, Redirect a Navigate, y las rutas usan element en vez de component/exact.',
    ],
    screenshots: [
      {
        src: '/screenshots/parcial-1-ionic/login.jpeg',
        caption: 'Pantalla de login con credenciales fijas (doctor / 1234) y aviso de credenciales de prueba.',
      },
      {
        src: '/screenshots/parcial-1-ionic/visitas.jpeg',
        caption: 'Tab de Visitas del día mostrando paciente, hora y estado (pendiente, en camino, finalizada) en tema oscuro.',
      },
      {
        src: '/screenshots/parcial-1-ionic/detalle-visita.jpeg',
        caption: 'Detalle de una visita con el botón para avanzar el estado, guardado en localStorage.',
      },
    ],
    },

    {
      slug: 'challenge-05',
      number: '05',
      title: 'Challenge 05 (Tasks App con Firebase)',
      summary:
        'Transformación de la Task App de Ionic (Challenge 03) para agregar Login, Registro y Logout con Firebase Authentication, un contexto para las tareas, otro para la autenticación, y un hook personalizado para la lógica de Firebase.',
      instructions: [
        'Transform the Tasks App to add firebase Login/Register, custom hooks and contexts.',
        'The app must contain: Login – Register – Logout with firebase.',
        'Routing pages: Login, Register, Tasks list, Add / Edit Task, Task Detail.',
        'Use one context to handle Tasks data through pages.',
        'Use another context to handle login and Register data.',
        'Use custom hooks to handle Firebase logic.',
      ],
      dueDate: '26 de septiembre de 2026',
      branch: 'challenge-05',
      status: 'submitted',
      appUrl: '/downloads/challenge-05-tasks-firebase.apk',
      notes: [
        'La lógica de Firebase vive en un hook (useAuth); el AuthContext solo la expone al resto de la app, sin hablar con Firebase directamente.',
      ],
      screenshots: [
        {
          src: '/screenshots/challenge-05/login.jpg',
          caption: 'Pantalla de login con Firebase Authentication (email/contraseña).',
        },
        {
          src: '/screenshots/challenge-05/registro.jpg',
          caption: 'Pantalla de registro para crear una cuenta nueva con Firebase.',
        },
        {
          src: '/screenshots/challenge-05/lista-tareas.jpg',
          caption: 'Lista de tareas tras iniciar sesión, con botón de logout y FAB para agregar.',
        },
        {
          src: '/screenshots/challenge-05/tarea-completada.jpg',
          caption: 'Tarea marcada como completada desde el contexto de tareas.',
        },
        {
          src: '/screenshots/challenge-05/nueva-tarea.jpg',
          caption: 'Página para agregar una nueva tarea.',
        },
        {
          src: '/screenshots/challenge-05/detalle-tarea.jpg',
          caption: 'Página de detalle de la tarea, con opciones de editar y eliminar.',
        },
      ],
    },

    {
      slug: 'challenge-06',
      number: '07',
      title: 'Challenge 06 (Firebase, Realtime y Dexie)',
      summary:
        'App Ionic con login real de Firebase y rutas protegidas. Contactos en Firestore, tareas en Realtime Database y frutas en Dexie. Detecta la conexión con @capacitor/network y deshabilita las acciones de contactos y tareas cuando no hay internet.',
      instructions: [
        'Implement a new app in ionic with real login and routes to handle, based on the previous challenges:',
        'Contacts in Firebase.',
        'Tasks in RealTime.',
        'Fruits in Dexie - newFunction.',
        'Validate if you have network connection, then enable or disable Contacts and Tasks actions depending on the network connection.',
      ],
      dueDate: '4 de octubre de 2026 (Disculpa la demora, tuve problemas con el Gradle y el JDK 26)',
      branch: 'challenge-06',
      status: 'submitted',
      appUrl: '/downloads/challenge-06.apk',
      screenshots: [
        { src: '/screenshots/challenge-06/icono-instalado.png', caption: 'App instalada como app nativa vía Capacitor.' },
        { src: '/screenshots/challenge-06/login.png', caption: 'Login real con Firebase Authentication.' },
        { src: '/screenshots/challenge-06/contactos.png', caption: 'Contactos guardados en Firestore, filtrados por usuario.' },
        { src: '/screenshots/challenge-06/tareas.png', caption: 'Tareas en Realtime Database, actualizadas en vivo.' },
        { src: '/screenshots/challenge-06/frutas.png', caption: 'Frutas en Dexie con proveedor, fecha de cosecha y buscador.' },
        { src: '/screenshots/challenge-06/sin-conexion.png', caption: 'Sin internet: contactos y tareas deshabilitados; las frutas siguen funcionando.' },
      ],
    },

        {
      slug: 'challenge-07',
      number: '07',
      title: 'Challenge 07 (Sensores con Capacitor)',
      summary:
        'App en Ionic React que usa los sensores y APIs nativas del celular mediante custom hooks: geolocalización, cámara, acelerómetro, información del dispositivo, vibración (haptics), sistema de archivos, notificaciones locales y notificaciones push. Una página Home con un botón por sensor y una página por cada uno. Instalada y probada en un celular Android real vía Capacitor.',
      instructions: [
        'Create a new Empty App.',
        'Use a Home Page to create buttons (one for each sensor).',
        'Create one new page for each sensor to implement each one of them.',
      ],
      dueDate: '17 de octubre de 2026',
      branch: 'challenge-07',
      status: 'submitted',
      appUrl: '/downloads/challenge-07-sensors.apk',
      notes: [
        'Cada sensor tiene su propio custom hook (useGeolocation, useCamera, useAccelerometer, useDevice, useHaptics, useFilesystem, useLocalNotifications, usePushNotifications) y una página que lo consume, dentro de un componente reutilizable SensorPage.',
        'La app se cierra al activar las notificaciones push',
      ],
      screenshots: [
        {
          src: '/screenshots/challenge-07/icono-instalado.jpeg',
          caption: 'App instalada como app nativa en un Samsung vía Capacitor.',
        },
        {
          src: '/screenshots/challenge-07/home.jpeg',
          caption: 'Pantalla Home con un botón por cada sensor.',
        },
        {
          src: '/screenshots/challenge-07/geolocalizacion.jpeg',
          caption: 'Geolocalización mostrando latitud, longitud, precisión, altitud y velocidad.',
        },
        {
          src: '/screenshots/challenge-07/camara.jpeg',
          caption: 'Cámara tomando una foto y mostrándola en pantalla.',
        },
        {
          src: '/screenshots/challenge-07/acelerometro.jpeg',
          caption: 'Acelerómetro con los ejes x, y, z y detección de sacudida.',
        },
        {
          src: '/screenshots/challenge-07/dispositivo.jpeg',
          caption: 'Información del dispositivo: modelo, sistema operativo y batería.',
        },
        {
          src: '/screenshots/challenge-07/haptics.jpeg',
          caption: 'Página de Haptics con los distintos tipos de vibración.',
        },
        {
          src: '/screenshots/challenge-07/filesystem.jpeg',
          caption: 'Sistema de archivos: crear, leer, listar y eliminar archivos.',
        },
        {
          src: '/screenshots/challenge-07/notificaciones-locales.jpeg',
          caption: 'Notificación local programada recibida en el dispositivo.',
        },
        {
          src: '/screenshots/challenge-07/push.jpeg',
          caption: 'Notificaciones push con el token de registro de Firebase.',
        },
      ],
    },
    
    {
      slug: 'parcial-2-ionic',
      number: '07',
      title: 'Parcial 2 (Ionic Misiones)',
      summary:
        'App móvil en Ionic React donde usuarios reales (login y registro con Firebase Auth) desbloquean y completan misiones con sensores reales: cámara, GPS, acelerómetro y vibración. Suma puntos, muestra progreso, resultados, notificaciones locales y un ranking top 5. El progreso se guarda en Firebase Realtime Database y en localStorage. Instalada y probada en un celular Android real vía Capacitor.',
      instructions: [
        'Construir, en 4 horas de trabajo, una app donde los usuarios desbloquean y completan misiones y por esto ganan puntos. Los usuarios son reales, pueden loguearse y registrarse en la app.',
        'El usuario logueado podrá: ver misiones disponibles, completar acciones, ganar puntos, ver progreso y ranking básico.',
        '1. Pantalla principal: lista de misiones (tomar foto, moverse 50 metros de su posición original, esperar 10 segundos quieto y entonces vibrar). Cada misión tiene estado (pendiente / completada) y puntos.',
        '2. Sistema de misiones. Misión 1 (Evidencia): tomar una foto con la cámara; se completa al guardar la imagen.',
        'Misión 2 (Movimiento real): detectar cambio de ubicación con distancia mayor a la indicada.',
        'Misión 3 (Permanencia activa): una vez recorridos los 50 metros se habilita la siguiente misión y el usuario deberá mantenerse quieto 10 segundos; pasados los 10 segundos el celular vibra (sin bloquear pantalla).',
        '3. Sistema de puntos: cada misión suma puntos y se muestra el total acumulado.',
        '4. Progreso: barra de progreso con porcentaje completado y misiones completadas / total.',
        '5. Persistencia: guardar en Firebase y local { "points": 120, "missions": [{ "id": 1, "completed": true }] }.',
        '6. Pantalla de resultados: puntos totales, misiones completadas y estado general.',
        'API: enviar puntos a Firebase.',
        'Notificaciones locales: "Has completado una misión" y "Te falta 1 misión para completar".',
        'Ranking: top 5 usuarios reales con puntaje real; el tuyo debe posicionarte frente a los otros 4.',
        'Requisitos técnicos: Ionic + React; Capacitor (Camera, Geolocation, vibrador, Local Notifications, acelerómetro); Hooks; manejo de estado; Firebase y local storage.',
      ],
      dueDate: '24 de Octubre de 2026',
      branch: 'parcial-2-Andre-rodriguez',
      status: 'submitted',
      appUrl: '/downloads/parcial-2-ionic.apk',
      notes: [
        'Estado global con Context + useReducer (MissionsContext). Los puntos no se guardan por separado en el estado: se derivan de las misiones completadas, así nunca quedan desincronizados.',
        'Hooks propios por sensor: useCamera (Camera + Filesystem), useDistanceTracker (Geolocation + fórmula de Haversine), useStillness (Motion/acelerómetro con contador que se reinicia si hay movimiento), useVibration (Haptics) y useLocalNotifications.',
        'Persistencia doble: localStorage al instante y Firebase Realtime Database (progress/{uid}); al iniciar sesión se fusionan ambos. Los puntos se envían además a ranking/{uid}.',
        'El enunciado menciona 50 m en el título y más de 30 m en la condición; se usó 50 m (constante MOVE_DISTANCE_METERS) para que la misión 3 se habilite tras recorrer los 50 m.',
      ],
      screenshots: [
        {
          src: '/screenshots/parcial-2-ionic/login.jpeg',
          caption: 'Login con usuarios reales de Firebase Authentication.',
        },
        {
          src: '/screenshots/parcial-2-ionic/registro.jpeg',
          caption: 'Registro de cuenta nueva con nombre, correo y contraseña; el nombre es el que se muestra en el ranking.',
        },
        {
          src: '/screenshots/parcial-2-ionic/permiso-notificaciones.jpeg',
          caption: 'Pantalla principal con las misiones pendientes; al entrar, Android pide permiso para las notificaciones locales.',
        },
        {
          src: '/screenshots/parcial-2-ionic/foto-evidencia.jpeg',
          caption: 'Misión 1: la foto tomada con la cámara se muestra antes de guardarla; al guardar la imagen la misión se completa.',
        },
        {
          src: '/screenshots/parcial-2-ionic/notificacion.jpeg',
          caption: 'Notificación local "Has completado una misión" al terminar la misión 1.',
        },
        {
          src: '/screenshots/parcial-2-ionic/permiso-ubicacion.jpeg',
          caption: 'Misión 2: Android pide permiso de ubicación precisa para medir la distancia recorrida con el GPS.',
        },
        {
          src: '/screenshots/parcial-2-ionic/ranking.jpeg',
          caption: 'Pestaña de ranking leyendo en tiempo real desde Firebase Realtime Database; el usuario se compara con los otros 4 mejores puntajes registrados.',
        },
        {
          src: '/screenshots/parcial-2-ionic/resultados.jpeg',
          caption: 'Pantalla de resultados: puntos totales, misiones completadas y estado general (En progreso).',
        },
      ],
      videos: [
        {
          src: '/videos/parcial-2-ionic/pasos-y-vibracion.mp4',
          caption: 'Misiones 2 y 3 en el dispositivo real: la distancia crece al caminar, se habilita la permanencia activa y el celular vibra a los 10 segundos quieto.',
        },
      ],
    },
]

export function getChallengeBySlug(slug) {
  return challenges.find((c) => c.slug === slug)
}

export function branchUrl(branch) {
  return `${REPO_URL}/tree/${branch}`
}

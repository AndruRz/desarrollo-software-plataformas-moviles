import { lazy } from 'react'

export const REPO_URL =
  'https://github.com/AndruRz/desarrollo-software-plataformas-moviles'

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
      branch: 'parcial-1-andre-rodriguez',
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
    branch: 'parcial-1-andre-rodriguez',
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
]

export function getChallengeBySlug(slug) {
  return challenges.find((c) => c.slug === slug)
}

export function branchUrl(branch) {
  return `${REPO_URL}/tree/${branch}`
}
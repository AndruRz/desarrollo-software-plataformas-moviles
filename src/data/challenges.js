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
      dueDate: 'PON AQUÍ LA FECHA REAL',
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


]

export function getChallengeBySlug(slug) {
  return challenges.find((c) => c.slug === slug)
}

export function branchUrl(branch) {
  return `${REPO_URL}/tree/${branch}`
}

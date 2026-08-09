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
      dueDate: 'Por definir',
      branch: 'challenge-01',
      status: 'submitted',
      Component: lazy(() => import('../challenges/Challenge_01')),
    },
]

export function getChallengeBySlug(slug) {
  return challenges.find((c) => c.slug === slug)
}

export function branchUrl(branch) {
  return `${REPO_URL}/tree/${branch}`
}

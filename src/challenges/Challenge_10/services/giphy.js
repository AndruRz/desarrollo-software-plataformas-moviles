const BASE_URL = 'https://api.giphy.com/v1'

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

export async function searchGifs({ query, limit = 24, offset = 0, signal }) {
  if (!API_KEY) {
    throw new Error(
      'Falta la API key de Giphy. Define VITE_GIPHY_API_KEY en el archivo .env (o en las variables de entorno de Netlify) y vuelve a compilar.'
    )
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    q: query,
    limit: String(limit),
    offset: String(offset),
    rating: 'g',
    lang: 'en',
  })

  const res = await fetch(`${BASE_URL}/gifs/search?${params}`, { signal })

  // fetch NO lanza error con 4xx / 5xx: hay que revisar res.ok
  if (!res.ok) {
    throw new Error(`Giphy respondió ${res.status}${res.statusText ? ` ${res.statusText}` : ''}`)
  }

  return res.json()
}

import { useEffect, useState } from 'react'
import { searchGifs } from '../services/giphy'

export function useGifSearch(query) {
  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = query.trim()

    if (!q) {
      setGifs([])
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await searchGifs({ query: q, signal: controller.signal })
        setGifs(result.data)
      } catch (e) {
        
        if (e.name === 'AbortError') return
        setError(e.message)
        setGifs([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return { gifs, loading, error }
}

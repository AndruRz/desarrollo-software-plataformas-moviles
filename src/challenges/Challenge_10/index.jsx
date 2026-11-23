import { useState } from 'react'
import SearchBar from './components/SearchBar'
import GifGrid from './components/GifGrid'
import { useGifSearch } from './hooks/useGifSearch'
import './style.css'

const SUGERENCIAS = ['smile', 'cat', 'dance', 'coding', 'wow']

function Challenge10() {
  const [query, setQuery] = useState('')
  const { gifs, loading, error } = useGifSearch(query)
  const hayTexto = query.trim() !== ''

  return (
    <div className="challenge10">
      <h2>Buscador de GIFs</h2>

      <SearchBar value={query} onChange={setQuery} />

      {!hayTexto && (
        <div className="giphy-hint">
          <p>Escribe algo para buscar, o prueba con:</p>
          <div className="giphy-chips">
            {SUGERENCIAS.map((s) => (
              <button key={s} type="button" className="giphy-chip mono" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="giphy-status">
          <span className="giphy-spinner" />
          <p>Buscando GIFs…</p>
        </div>
      )}

      {error && <p className="giphy-error">{error}</p>}

      {hayTexto && !loading && !error && gifs.length === 0 && (
        <p className="giphy-empty">Sin resultados para “{query.trim()}”.</p>
      )}

      {gifs.length > 0 && <GifGrid gifs={gifs} />}

      <p className="giphy-credit mono">Powered by GIPHY</p>
    </div>
  )
}

export default Challenge10

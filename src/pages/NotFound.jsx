import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      className="container mono"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--text-faint)' }}>
        fatal: '{location.pathname}' no es una rama conocida
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, margin: 0 }}>
        404 — rama no encontrada
      </h1>
      <Link to="/" className="btn btn--ghost" style={{ marginTop: 8 }}>
        ← git checkout main
      </Link>
    </div>
  )
}

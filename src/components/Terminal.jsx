import { useEffect, useRef, useState } from 'react'

const COMMAND = 'git log --graph --oneline --all'

export default function Terminal({ lines }) {
  const [typed, setTyped] = useState('')
  const [showLines, setShowLines] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setTyped(COMMAND)
      setShowLines(true)
      return
    }

    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(COMMAND.slice(0, i))
      if (i >= COMMAND.length) {
        clearInterval(id)
        setTimeout(() => setShowLines(true), 200)
      }
    }, 32)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="mono"
      style={{
        background: 'var(--bg-inset)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: '0 20px 60px -30px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '10px 14px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--bg-raised)',
        }}
      >
        {['#e2685a', '#e0b04a', '#5fb87a'].map((c) => (
          <span
            key={c}
            style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }}
          />
        ))}
        <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-faint)' }}>
          desarrollo-software-plataformas-moviles
        </span>
      </div>
      <div style={{ padding: '18px 16px 20px', fontSize: 13.5, lineHeight: 1.7 }}>
        <div>
          <span style={{ color: 'var(--done)' }}>➜</span>{' '}
          <span style={{ color: 'var(--branch)' }}>repo</span>{' '}
          <span style={{ color: 'var(--text)' }}>{typed}</span>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 7,
              height: 15,
              marginLeft: 2,
              background: 'var(--text-dim)',
              verticalAlign: 'text-bottom',
              opacity: showLines ? 0 : 1,
            }}
          />
        </div>
        {showLines && (
          <div style={{ marginTop: 10, color: 'var(--text-dim)' }}>
            {lines.map((l, idx) => (
              <div key={idx} style={{ whiteSpace: 'pre' }}>
                {l}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

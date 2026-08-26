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
    <div className="mono terminal">
      <div className="terminal__bar">
        {['#e2685a', '#e0b04a', '#5fb87a'].map((c) => (
          <span
            key={c}
            style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }}
          />
        ))}
        <span className="terminal__bar-label">
          desarrollo-software-plataformas-moviles
        </span>
      </div>
      <div className="terminal__body">
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
          <div className="terminal__lines">
            {lines.map((l, idx) => (
              <div key={idx} className="terminal__line">
                {l}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

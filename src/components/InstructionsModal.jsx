import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './InstructionsModal.css'

function InstructionsModal({ slug, title, instructions, onClose }) {
  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', manejarTecla)
    return () => document.removeEventListener('keydown', manejarTecla)
  }, [onClose])

  return (
    <div className="instructions-modal__backdrop" onClick={onClose}>
      <div
        className="instructions-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Instrucciones de ${title}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="instructions-modal__bar">
          <div className="instructions-modal__dots">
            <span />
            <span />
            <span />
          </div>
          <span className="instructions-modal__title mono">instrucciones-docente.md</span>
          <button className="instructions-modal__close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="instructions-modal__body">
          <ul className="instructions-modal__list">
            {instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-modal__footer">
          <Link to={`/desafio/${slug}`} className="instructions-modal__link mono">
            ver desafío completo →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InstructionsModal
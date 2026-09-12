import { Suspense, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import './ChallengeDemo.css'
import ChallengeErrorBoundary from '../components/ChallengeErrorBoundary'
import InstructionsModal from '../components/InstructionsModal'
import { getChallengeBySlug } from '../data/challenges'

export default function ChallengeDemo() {
  const { slug } = useParams()
  const challenge = getChallengeBySlug(slug)
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false)

  if (!challenge || !challenge.Component) {
    return <Navigate to="/" replace />
  }

  const { title, Component, instructions } = challenge

  return (
    <div className="demo">
      <header className="demo__bar">
        <Link to="/" className="demo__home mono">
          ← volver al inicio
        </Link>
        <span className="demo__title">{title}</span>
        <button
          className="demo__back mono"
          onClick={() => setMostrarInstrucciones(true)}
        >
          ver instrucciones
        </button>
      </header>

      <div className="demo__stage">
        <div className="demo__frame">
          <div className="demo__dots">
            <span />
            <span />
            <span />
          </div>
          <div className="demo__frame-body">
            <ChallengeErrorBoundary>
              <Suspense fallback={<div className="demo__loading">cargando demo…</div>}>
                <Component />
              </Suspense>
            </ChallengeErrorBoundary>
          </div>
        </div>
      </div>

      {mostrarInstrucciones && (
        <InstructionsModal
          slug={slug}
          title={title}
          instructions={instructions}
          onClose={() => setMostrarInstrucciones(false)}
        />
      )}
    </div>
  )
}


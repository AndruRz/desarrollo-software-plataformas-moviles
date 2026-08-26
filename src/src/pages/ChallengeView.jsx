import { Suspense } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import './ChallengeView.css'
import BranchPill from '../components/BranchPill'
import ChallengeErrorBoundary from '../components/ChallengeErrorBoundary'
import { getChallengeBySlug, branchUrl, REPO_URL } from '../data/challenges'

export default function ChallengeView() {
  const { slug } = useParams()
  const challenge = getChallengeBySlug(slug)

  if (!challenge) {
    return <Navigate to="/" replace />
  }

  const { number, title, summary, instructions, dueDate, branch, Component, pwaUrl, installGuide } = challenge

  return (
    <div className="container cv">
      <Link to="/" className="cv__back mono">
        ← volver al repositorio
      </Link>

      <div className="cv__head">
        <div className="cv__eyebrow mono">Desafío {number}</div>
        <h1 className="cv__title">{title}</h1>

        <div className="cv__meta">
          <BranchPill branch={branch} variant={branch === 'main' ? 'main' : 'branch'} />
          <span className="cv__meta-item">Entrega: {dueDate}</span>
        </div>

        <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.6, margin: '0 0 20px' }}>
          {summary}
        </p>

        <div className="cv__actions">
          <a className="btn btn--main" href={branchUrl(branch)} target="_blank" rel="noreferrer">
            Ver rama en GitHub ↗
          </a>
          <a className="btn btn--ghost" href={REPO_URL} target="_blank" rel="noreferrer">
            Repositorio completo
          </a>
        </div>
      </div>

      <div className="cv__block">
        <div className="cv__block-head">instrucciones-docente.md</div>
        <div className="cv__block-body">
          <ul className="cv__instructions">
            {instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {installGuide && (
        <div className="cv__block">
          <div className="cv__block-head">como-instalar.md</div>
          <div className="cv__block-body">
            {pwaUrl && (
              <p className="cv__install-link">
                🔗{' '}
                <a href={pwaUrl} target="_blank" rel="noreferrer">
                  {pwaUrl}
                </a>
              </p>
            )}
            <div className="cv__install-grid">
              {installGuide.map((platform) => (
                <div className="cv__install-col" key={platform.platform}>
                  <h3 className="cv__install-title">{platform.platform}</h3>
                  <ol className="cv__install-steps">
                    {platform.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="cv__block cv__preview-wrap">
        <div className="cv__block-head">vista previa</div>
        <div className="cv__preview-body">
          <ChallengeErrorBoundary>
            <Suspense fallback={<div className="cv__loading">cargando componente…</div>}>
              <Component />
            </Suspense>
          </ChallengeErrorBoundary>
        </div>
      </div>
    </div>
  )
}

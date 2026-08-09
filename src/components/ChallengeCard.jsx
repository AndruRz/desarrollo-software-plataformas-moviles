import { Link, useNavigate } from 'react-router-dom'
import BranchPill from './BranchPill'
import { branchUrl } from '../data/challenges'

const STATUS_LABEL = {
  'in-progress': 'En curso',
  submitted: 'Entregado',
  graded: 'Calificado',
}

function StatusDot({ status }) {
  const color = status === 'graded' ? 'var(--done)' : status === 'submitted' ? 'var(--branch)' : 'var(--main-line)'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: 'var(--text-dim)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      {STATUS_LABEL[status] ?? status}
    </span>
  )
}

export default function ChallengeCard({ challenge }) {
  const { slug, number, title, summary, dueDate, branch, status } = challenge
  const navigate = useNavigate()

  return (
    <article className="graph-node">
      <span className="graph-dot" aria-hidden="true" />
      <span className="graph-elbow" aria-hidden="true" />

      <div
        className="challenge-card"
        role="link"
        tabIndex={0}
        onClick={() => navigate(`/desafio/${slug}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') navigate(`/desafio/${slug}`)
        }}
      >
        <div className="challenge-card__top">
          <span className="mono challenge-card__number">{number}</span>
          <h3 className="challenge-card__title">{title}</h3>
        </div>

        <p className="challenge-card__summary">{summary}</p>

        <div className="challenge-card__meta">
          <BranchPill branch={branch} />
          <span className="mono challenge-card__date">Entrega: {dueDate}</span>
          <StatusDot status={status} />
        </div>

        <div className="challenge-card__footer">
          <Link to={`/desafio/${slug}`} className="challenge-card__cta">
            Ver desafío →
          </Link>
          <a
            href={branchUrl(branch)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="challenge-card__gh"
          >
            Ver rama en GitHub ↗
          </a>
        </div>
      </div>
    </article>
  )
}

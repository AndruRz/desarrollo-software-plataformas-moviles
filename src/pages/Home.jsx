import './Home.css'
import Terminal from '../components/Terminal'
import ChallengeCard from '../components/ChallengeCard'
import BranchPill from '../components/BranchPill'
import { challenges, REPO_URL } from '../data/challenges'

export default function Home() {
  const terminalLines = challenges.length
    ? challenges.map(
        (c) => `* ${c.slug.padEnd(14)} ${c.title} — ${c.status}`
      )
    : ['(sin desafíos todavía)']

  return (
    <>
      <header className="container hero">
        <div className="hero__eyebrow">app-moviles / portafolio de desafíos</div>
        <h1 className="hero__title">
          Un repositorio,
          <br />
          una <span>rama</span> por desafío.
        </h1>
        <p className="hero__sub">
          Cada reto de la asignatura vive en su propia rama del mismo
          repositorio. Aquí se listan a medida que el docente los va
          proponiendo: descripción, instrucciones, fecha de entrega y una
          vista en vivo de la solución.
        </p>
        <div className="hero__actions">
          <a
            className="btn btn--main"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            Ver repositorio ↗
          </a>
          <a
            className="btn btn--ghost"
            href={`${REPO_URL}/tree/main`}
            target="_blank"
            rel="noreferrer"
          >
            <BranchPill branch="main" variant="main" /> rama principal
          </a>
        </div>
      </header>

      <div className="container" style={{ paddingBottom: 8 }}>
        <Terminal lines={terminalLines} />
      </div>

      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">Desafíos</h2>
          <span className="section__count mono">
            {challenges.length} rama{challenges.length === 1 ? '' : 's'}
          </span>
        </div>

        {challenges.length === 0 ? (
          <p className="empty-state">
            Todavía no hay desafíos publicados. En cuanto se agregue una
            entrada en <code className="mono">src/data/challenges.js</code>{' '}
            aparecerá aquí automáticamente.
          </p>
        ) : (
          <div className="graph-rail">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.slug} challenge={challenge} />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="container">github.com/AndruRz — build local, ship por rama</div>
      </footer>
    </>
  )
}

import './ChallengeFilter.css'

function SearchIcon() {
  return (
    <svg
      className="challenge-filter__search-icon"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default function ChallengeFilter({
  query,
  onQueryChange,
  branches,
  activeBranch,
  onBranchChange,
}) {
  return (
    <div className="challenge-filter">
      <div className="challenge-filter__search">
        <SearchIcon />
        <input
          type="text"
          className="challenge-filter__input"
          placeholder="Buscar por título…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="challenge-filter__clear"
            onClick={() => onQueryChange('')}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      <div className="challenge-filter__branches">
        <button
          type="button"
          className={`challenge-filter__pill${activeBranch === null ? ' is-active' : ''}`}
          onClick={() => onBranchChange(null)}
        >
          Todas
        </button>
        {branches.map((branch) => (
          <button
            key={branch}
            type="button"
            className={`challenge-filter__pill${activeBranch === branch ? ' is-active' : ''}`}
            onClick={() => onBranchChange(activeBranch === branch ? null : branch)}
          >
            {branch}
          </button>
        ))}
      </div>
    </div>
  )
}
function BranchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 2.5v6.2M4 8.7A3.3 3.3 0 0 0 7.3 12H9M11.5 3.5A1.5 1.5 0 1 1 11.5 0.5a1.5 1.5 0 0 1 0 3ZM4 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9 13.5A1.5 1.5 0 1 0 9 10.5a1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 1)"
      />
    </svg>
  )
}

export default function BranchPill({ branch, variant = 'branch' }) {
  const isMain = variant === 'main'
  return (
    <span
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 9px 3px 7px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        color: isMain ? 'var(--main-line)' : 'var(--branch)',
        background: isMain ? 'rgba(242,169,59,0.1)' : 'rgba(124,158,255,0.1)',
        border: `1px solid ${isMain ? 'var(--main-line-dim)' : 'var(--branch-dim)'}`,
        whiteSpace: 'nowrap',
      }}
    >
      <BranchIcon />
      {branch}
    </span>
  )
}

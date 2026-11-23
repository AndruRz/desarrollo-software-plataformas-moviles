function SearchBar({ value, onChange }) {
  return (
    <form className="giphy-search" onSubmit={(e) => e.preventDefault()}>
      <span className="giphy-search__icon mono" aria-hidden="true">
        $
      </span>
      <input
        type="search"
        placeholder="Busca un GIF… (ej: smile)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar GIFs"
        autoComplete="off"
      />
    </form>
  )
}

export default SearchBar

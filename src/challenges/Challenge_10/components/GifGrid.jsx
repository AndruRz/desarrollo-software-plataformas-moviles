function GifGrid({ gifs }) {
  return (
    <div className="giphy-grid">
      {gifs.map((gif) => (
        <a
          key={gif.id}
          className="giphy-card"
          href={gif.url}
          target="_blank"
          rel="noreferrer"
          title={gif.title}
        >
          <img src={gif.images.fixed_width.url} alt={gif.title || 'GIF'} loading="lazy" />
          {gif.title && <span className="giphy-card__title mono">{gif.title}</span>}
        </a>
      ))}
    </div>
  )
}

export default GifGrid

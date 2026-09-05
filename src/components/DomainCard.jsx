function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function CardContents({ name, description, preview, offline }) {
  return (
    <>
      <div className={`project-art ${offline ? 'project-art--empty' : ''}`}>
        {preview && <img src={preview} alt={`${name} website preview`} loading="lazy" />}
        {!offline && <span className="project-arrow" aria-hidden="true"><ArrowIcon /></span>}
      </div>
      <div className="project-copy">
        <h2>{name}</h2>
        {description && <p>{description}</p>}
      </div>
    </>
  )
}

function DomainCard({ name, url, description, preview, offline = false, featured, animationDelay }) {
  const className = `project-piece ${featured ? 'project-piece--wide' : ''} ${offline ? 'project-piece--offline' : ''}`

  if (offline) {
    return (
      <div className={className} style={{ animationDelay }} aria-disabled="true">
        <CardContents name={name} description={description} offline />
      </div>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} style={{ animationDelay }}>
      <CardContents name={name} description={description} preview={preview} />
    </a>
  )
}

export default DomainCard

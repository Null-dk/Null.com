function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function DomainCard({ name, url, description, icon, featured, animationDelay }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-piece ${featured ? 'project-piece--wide' : ''}`}
      style={{ animationDelay }}
    >
      <div className="project-art" aria-hidden="true">
        <div className="project-art-grid" />
        <span className="project-symbol">{icon}</span>
        <span className="project-ghost-name">{name}</span>
        <span className="project-arrow"><ArrowIcon /></span>
      </div>
      <div className="project-copy">
        <h2>{name}</h2>
        {description && <p>{description}</p>}
      </div>
    </a>
  )
}

export default DomainCard

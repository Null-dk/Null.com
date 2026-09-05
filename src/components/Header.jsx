function Header({ copy }) {
  return (
    <header className="portfolio-hero max-w-[1180px] mx-auto relative z-10 animate-fade-in-up">
      <p className="hero-eyebrow">{copy.established} — COPENHAGEN</p>
      <h1 className="portfolio-title">
        <span>Null</span>
        <span>Incorporated</span>
      </h1>
      <div className="hero-foot">
        <p>{copy.tagline}</p>
        <span aria-hidden="true">↘</span>
      </div>
    </header>
  )
}

export default Header

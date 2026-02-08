function About() {
  return (
    <section
      className="max-w-[1100px] w-full mx-auto mt-24 md:mt-32 animate-fade-in-up"
      style={{ animationDelay: '0.8s' }}
      aria-label="About"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[0.65rem] tracking-[6px] text-text-secondary uppercase opacity-40">
          About
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Content card */}
      <div className="domain-card group relative p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <h2 className="font-mono text-sm font-bold text-accent tracking-tight mb-4 opacity-50">
              // about
            </h2>
            <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed opacity-70">
              One person making niche web tools and small projects. Nothing fancy, just stuff that I find useful or interesting.
            </p>
          </div>

          {/* Link */}
          <div className="shrink-0">
            <a
              href="https://github.com/Null-dk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 border border-white/10 rounded-sm font-mono text-xs tracking-wider text-text-secondary hover:text-accent hover:border-white/25 transition-all duration-300 group/link"
            >
              <svg
                className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GITHUB</span>
              <span className="opacity-30 group-hover/link:opacity-60 transition-opacity duration-300">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

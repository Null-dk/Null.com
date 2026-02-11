function About() {
  const socialLinks = [
    {
      name: 'GitHub',
      handle: '@Null-dk',
      href: 'https://github.com/Null-dk',
      icon: (
        <svg
          className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity duration-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      handle: 'n__ull',
      href: 'https://discord.com/users/1109605618085531648',
      icon: (
        <svg
          className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity duration-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.994 3.03.078.078 0 0 0 .084-.027 14.2 14.2 0 0 0 1.226-1.994.077.077 0 0 0-.042-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.098.246.196.373.293a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.771 1.364 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.062.062 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.956-2.418 2.157-2.418c1.21 0 2.167 1.093 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.956-2.418 2.157-2.418c1.21 0 2.167 1.093 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      className="max-w-[1100px] w-full mx-auto mt-24 md:mt-32 animate-fade-in-up"
      style={{ animationDelay: '0.8s' }}
      aria-label="Social"
    >
      <div className="flex items-center gap-4 mb-10">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[0.65rem] tracking-[6px] text-text-secondary uppercase opacity-40">
          Social
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="domain-card group relative p-8 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-sm font-bold text-accent tracking-tight opacity-50">
            // social
          </h2>
          <span className="font-mono text-[0.6rem] tracking-wider text-text-secondary/35 uppercase">
            02 links
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-5 py-3 border border-white/10 rounded-sm font-mono text-xs tracking-wider text-text-secondary hover:text-accent hover:border-white/25 transition-all duration-300 group/link"
            >
              <span className="inline-flex items-center gap-3 min-w-0">
                {link.icon}
                <span className="truncate">{link.name.toUpperCase()}</span>
              </span>
              <span className="text-[0.62rem] text-text-secondary/40 group-hover/link:text-text-secondary/70 transition-colors duration-300 truncate">
                {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

const links = [
  {
    name: 'GitHub',
    handle: '@Null-dk',
    href: 'https://github.com/Null-dk',
    path: 'M12 1C5.9 1 1 5.9 1 12c0 4.9 3.2 9.1 7.5 10.5.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.1-5.1 5.4.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11 11 0 0 0 23 12C23 5.9 18.1 1 12 1Z',
  },
  {
    name: 'Discord',
    handle: 'n__ull',
    href: 'https://discord.com/users/1109605618085531648',
    path: 'M19.5 5.3A18 18 0 0 0 15 3.9l-.6 1.2a16 16 0 0 0-4.8 0L9 3.9a18 18 0 0 0-4.5 1.4C1.7 9.5 1 13.6 1.4 17.6a18.4 18.4 0 0 0 5.5 2.8l1.1-1.8-1.7-.8.8-.6c3.6 1.6 7.5 1.6 11 0l.8.6-1.7.8 1.1 1.8a18.3 18.3 0 0 0 5.5-2.8c.5-4.7-.7-8.8-3.3-12.3ZM8.6 15.1c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.8 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z',
  },
]

function About() {
  return (
    <section className="elsewhere max-w-[1180px] w-full mx-auto" aria-label="Social links">
      <h2>Elsewhere</h2>
      <div className="social-grid">
        {links.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={link.path} /></svg>
            <span className="social-name">{link.name}</span>
            <span className="social-handle">{link.handle}</span>
            <span className="social-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <div className="site-tail">
        <span>© {new Date().getFullYear()} Null Incorporated</span>
      </div>
    </section>
  )
}

export default About

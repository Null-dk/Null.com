function TickerContent() {
  const items = [
    { type: 'text', value: 'Null Incorporated' },
    { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' },
    { type: 'text', value: 'Creative Web Solutions' },
    { type: 'link', value: 'contact@n-ull.com', href: 'mailto:contact@n-ull.com' },
    { type: 'text', value: 'Digital Products' },
    { type: 'text', value: 'Open Source' },
    { type: 'text', value: 'Based in Denmark' },
  ]

  return (
    <div className="flex items-center gap-0 pr-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          {i > 0 && (
            <span className="mx-6 text-white/10 text-[0.6rem]" aria-hidden="true">&bull;</span>
          )}
          {item.type === 'link' ? (
            <a
              href={item.href}
              className="ticker-link font-mono text-[0.75rem] text-accent/80 no-underline transition-all duration-300 whitespace-nowrap hover:text-accent"
            >
              {item.value}
            </a>
          ) : (
            <span className="font-mono text-[0.75rem] text-text-secondary/50 uppercase tracking-wider whitespace-nowrap">
              {item.value}
            </span>
          )}
        </div>
      ))}
      <span className="mx-6 text-white/10 text-[0.6rem]" aria-hidden="true">&bull;</span>
    </div>
  )
}

function Ticker() {
  return (
    <footer
      className="ticker-footer fixed bottom-0 left-0 w-full border-t border-white/5 overflow-hidden backdrop-blur-[16px] z-50 animate-fade-in"
      style={{
        background: 'linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.95))',
        animationDelay: '0.8s',
      }}
      aria-label="Company information"
    >
      <div className="py-3.5">
        <div className="ticker-track flex w-max animate-ticker-scroll hover:[animation-play-state:paused]">
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </footer>
  )
}

export default Ticker

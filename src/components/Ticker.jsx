function TickerContent() {
  return (
    <div className="flex items-center gap-6 pr-6">
      <div className="inline-flex items-center gap-6 font-mono text-[0.8rem] font-medium tracking-[1px] whitespace-nowrap max-sm:text-[0.7rem] max-sm:gap-4 max-[480px]:text-[0.65rem]">
        <span className="text-text-primary uppercase opacity-80">Null Incorporated</span>
        <span className="text-accent-secondary font-bold opacity-40" aria-hidden="true">//</span>
        <a href="https://n-ull.com" className="ticker-link text-accent no-underline transition-all duration-300">n-ull.com</a>
        <span className="text-accent-secondary font-bold opacity-40" aria-hidden="true">//</span>
        <span className="text-text-primary uppercase opacity-80">Web Development</span>
        <span className="text-accent-secondary font-bold opacity-40" aria-hidden="true">//</span>
        <a href="mailto:contact@n-ull.com" className="ticker-link text-accent no-underline transition-all duration-300">contact@n-ull.com</a>
        <span className="text-accent-secondary font-bold opacity-40" aria-hidden="true">//</span>
        <span className="text-text-primary uppercase opacity-80">Digital Solutions</span>
        <span className="text-accent-secondary font-bold opacity-40" aria-hidden="true">//</span>
      </div>
    </div>
  )
}

function Ticker() {
  return (
    <footer
      className="ticker-footer fixed bottom-0 left-0 w-full border-t border-glass-border py-4 overflow-hidden backdrop-blur-[12px] z-50 animate-fade-in max-sm:py-3"
      style={{
        background: 'linear-gradient(180deg, transparent, rgba(10,10,10,0.8) 20%, var(--color-bg) 100%)',
        animationDelay: '0.6s',
      }}
      aria-label="Company information"
    >
      <div className="ticker-track flex w-max animate-ticker-scroll hover:[animation-play-state:paused]">
        <TickerContent />
        <TickerContent />
      </div>
    </footer>
  )
}

export default Ticker

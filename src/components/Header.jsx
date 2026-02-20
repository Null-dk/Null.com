import { useUptime } from '../hooks/useUptime'

function Header({ copy, projectCount }) {
  const uptime = useUptime()

  return (
    <header className="text-center mb-16 md:mb-20 relative z-10 animate-fade-in-up max-w-3xl mx-auto group">
      {/* Top decorative line */}
      <div className="flex items-center justify-center gap-3 mb-8 opacity-30">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/60" />
        <span className="font-mono text-[0.6rem] tracking-[6px] text-text-secondary uppercase">{copy.established}</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/60" />
      </div>

      {/* Main title */}
      <h1 className="font-mono text-[clamp(2.2rem,7vw,4.5rem)] font-extrabold tracking-[-2px] relative uppercase leading-[1.1] text-accent transition-all duration-500 ease-[var(--ease-out-expo)] [text-shadow:0_0_40px_rgba(255,255,255,0.08)] hover:[text-shadow:0_0_60px_rgba(255,255,255,0.15),0_0_100px_rgba(255,255,255,0.05)]">
        <span className="glitch-text">{copy.title}</span>
      </h1>

      {/* Tagline */}
      <p className="font-sans text-sm md:text-base text-text-secondary mt-4 leading-relaxed max-w-md mx-auto opacity-60 transition-opacity duration-300 group-hover:opacity-80">
        {copy.tagline}
      </p>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-6 md:gap-8 mt-8 font-mono text-[0.65rem] md:text-[0.7rem] text-text-secondary tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }} />
          <span className="opacity-60">{copy.systemsOnline}</span>
        </div>
        <span className="text-white/10">|</span>
        <div className="flex items-center gap-2">
          <span className="opacity-60">UPTIME {uptime}</span>
        </div>
        <span className="text-white/10 hidden sm:inline">|</span>
        <div className="hidden sm:flex items-center gap-2">
          <span className="opacity-60">{copy.projects(projectCount)}</span>
        </div>
      </div>
    </header>
  )
}

export default Header

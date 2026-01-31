import { useUptime } from '../hooks/useUptime'

function StatusBar() {
  const uptime = useUptime()

  return (
    <aside className="status-bar-aside fixed top-6 right-6 flex flex-col gap-2 z-100 animate-fade-in max-sm:top-4 max-sm:right-4" style={{ animationDelay: '0.4s' }} aria-label="System status">
      <div className="flex items-center gap-2.5 bg-glass-bg border border-glass-border rounded-3xl py-2.5 px-4 font-mono text-[0.7rem] text-text-secondary backdrop-blur-[12px] tracking-[0.5px] transition-all duration-300 hover:border-white/15 hover:bg-white/5 max-sm:text-[0.65rem] max-sm:py-2 max-sm:px-3">
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot"
          style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}
          aria-hidden="true"
        />
        <span>SYSTEMS ONLINE</span>
      </div>
      <div className="flex items-center gap-2.5 bg-glass-bg border border-glass-border rounded-3xl py-2.5 px-4 font-mono text-[0.7rem] text-text-secondary backdrop-blur-[12px] tracking-[0.5px] transition-all duration-300 hover:border-white/15 hover:bg-white/5 max-sm:text-[0.65rem] max-sm:py-2 max-sm:px-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span>UPTIME: <span className="transition-opacity duration-150">{uptime}</span></span>
      </div>
    </aside>
  )
}

export default StatusBar

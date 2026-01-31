function StatusBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        <div className="font-mono text-[0.7rem] sm:text-xs text-text-secondary tracking-wider opacity-40">
          NULL INC
        </div>

        <a
          href="https://n-ull.com"
          className="font-mono text-[0.65rem] sm:text-[0.7rem] text-text-secondary tracking-wider opacity-40 hover:opacity-80 transition-opacity duration-300"
        >
          N-ULL.COM
        </a>
      </div>
    </nav>
  )
}

export default StatusBar

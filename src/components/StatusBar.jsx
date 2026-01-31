function StatusBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        {/* Logo mark */}
        <div className="flex items-center gap-2.5 font-mono text-[0.7rem] sm:text-xs text-text-secondary tracking-wider">
          <span className="text-accent font-bold">N.</span>
          <span className="opacity-40 hidden sm:inline">NULL INC</span>
        </div>

        {/* Right side links */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[0.65rem] sm:text-[0.7rem] text-text-secondary tracking-wider">
          <a
            href="mailto:contact@n-ull.com"
            className="opacity-40 hover:opacity-80 transition-opacity duration-300"
          >
            CONTACT
          </a>
          <span className="opacity-15 hidden sm:inline">|</span>
          <a
            href="https://n-ull.com"
            className="opacity-40 hover:opacity-80 transition-opacity duration-300 hidden sm:inline"
          >
            N-ULL.COM
          </a>
        </div>
      </div>
    </nav>
  )
}

export default StatusBar

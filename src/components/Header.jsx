function Header() {
  return (
    <header className="text-center mb-12 md:mb-20 relative z-10 animate-fade-in-up group">
      <h1 className="font-mono text-[clamp(2.5rem,8vw,5rem)] font-extrabold tracking-[-2px] relative uppercase p-4 md:p-5 text-accent transition-all duration-500 ease-[var(--ease-out-expo)] [text-shadow:0_0_40px_rgba(255,255,255,0.08)] hover:[text-shadow:0_0_60px_rgba(255,255,255,0.15),0_0_100px_rgba(255,255,255,0.05)]">
        <span className="glitch-text">Null Incorporated</span>
      </h1>
      <p className="font-mono text-[0.85rem] text-text-secondary mt-5 tracking-[4px] opacity-70 transition-opacity duration-300 ease-linear group-hover:opacity-100 max-sm:text-[0.75rem] max-sm:tracking-[2px] max-[480px]:text-[0.65rem] max-[480px]:tracking-[1px]">
        // CREATIVE WEB SOLUTIONS //
      </p>
    </header>
  )
}

export default Header

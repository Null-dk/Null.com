function BackgroundEffects() {
  return (
    <>
      {/* Animated orbs */}
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float"
        style={{ width: 400, height: 400, top: '-10%', left: '-5%', filter: 'blur(80px)', opacity: 0.4, background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float"
        style={{ width: 300, height: 300, bottom: '-5%', right: '-5%', filter: 'blur(80px)', opacity: 0.4, background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)', animationDelay: '-10s' }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div className="bg-grid fixed inset-0 w-full h-full -z-3" aria-hidden="true" />

      {/* Noise */}
      <div className="noise-overlay fixed inset-0 w-full h-full pointer-events-none z-[1000]" aria-hidden="true" />

      {/* Scan lines */}
      <div className="scan-lines-wrapper fixed inset-0 w-full h-full pointer-events-none z-90 overflow-hidden" aria-hidden="true">
        <div className="scan-line absolute left-0 w-full h-[2px] opacity-0 animate-scanline" />
      </div>
    </>
  )
}

export default BackgroundEffects
